import Comments from "@/components/Comments/Comments";
import Post from "@/components/Post/Post";
import { icons } from "@/constants";
import { SearchParamProps } from "@/types";
import { prisma } from "@/utils/prisma/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const StatusPage = async ({ params }: SearchParamProps) => {
  const { username, postId } = await params;
  const { userId } = await auth();

  if (!userId) return;

  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, reposts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    reposts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
  };

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      ...postIncludeQuery,
      comments: {
        include: postIncludeQuery,
      },
    },
  });

  if (!post) return notFound();

  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/65">
        <Link href="/">
          <icons.Back className="size-4" />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" post={post} />
      <Comments
        comments={post.comments}
        postId={post.id}
        username={post.user.username}
      />
    </div>
  );
};

export default StatusPage;
