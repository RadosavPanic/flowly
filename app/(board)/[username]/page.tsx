import Link from "next/link";
import React from "react";
import { icons } from "@/constants";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import Feed from "@/components/Feed/Feed";
import { prisma } from "@/utils/prisma/prisma";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SearchParamProps } from "@/types";
import FollowButton from "@/components/Profile/FollowButton";

const UserPage = async ({ params }: SearchParamProps) => {
  const { username } = await params;

  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();

  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/65">
        <Link href="/">
          <icons.Back className="size-4" />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>

      {/* INFO */}
      <div className="">
        <div className="relative w-full">
          <div className="w-full aspect-[3/1] relative">
            <OptimizedImage
              src={user.cover || "general/noCover.png"}
              alt=""
              width={600}
              height={200}
              tr={true}
            />
          </div>

          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <OptimizedImage
              src={user.img || "general/noAvatar.png"}
              alt=""
              width={120}
              height={120}
              tr={true}
            />
          </div>
        </div>

        {/* USER OPTIONS */}
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="size-9 flex items-center justify-center rounded-full border border-gray-500 cursor-pointer">
            <icons.More className="size-5" />
          </div>
          <div className="size-9 flex items-center justify-center rounded-full border border-gray-500 cursor-pointer">
            <icons.Explore className="size-5" />
          </div>
          <div className="size-9 flex items-center justify-center rounded-full border border-gray-500 cursor-pointer">
            <icons.Message className="size-5" />
          </div>
          {userId && (
            <FollowButton
              userId={user.id}
              isFollowed={!!user.followings.length}
            />
          )}
        </div>

        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          <div className="">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <span className="text-textGray text-sm">@{user.username}</span>
          </div>
          {user.bio && <p>{user.bio}</p>}
          {/* JOB & LOCATION & DATE */}
          <div className="flex gap-4 text-base">
            {user.location && (
              <div className="flex items-center gap-2">
                <icons.Location className="size-5" />
                <span>{user.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <icons.Date className="size-5" />
              <span>
                Joined{" "}
                {new Date(user.createdAt.toString()).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )}
              </span>
            </div>
          </div>
          {/* FOLLOWINGS & FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followings}</span>
              <span className="text-textGray text-base">Following</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followers}</span>
              <span className="text-textGray text-base">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEED */}
      <Feed userProfileId={user?.id} />
    </div>
  );
};

export default UserPage;
