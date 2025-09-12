"use client";

import Link from "next/link";
import cn from "clsx";
import { format } from "timeago.js";
import { PostWithDetails } from "@/types";

import PostInfo from "./PostInfo";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import PostInteractions from "./PostInteractions";
import { icons } from "@/constants";

const Post = ({
  type,
  post,
}: {
  type?: "status" | "comment";
  post: PostWithDetails;
}) => {
  const originalPost = post.repost || post;

  return (
    <div className="p-4 border-y border-borderGray">
      {post.repostId && (
        <div className="flex items-center gap-2 text-sm mb-2 font-bold text-textGray">
          <icons.Repost className="size-[18px] text-textGray" />
          <span className="">{post.user.displayName} reposted</span>
        </div>
      )}

      <div className={cn("flex gap-4", type === "status" && "flex-col")}>
        <div
          className={cn(
            "relative size-10 rounded-full overflow-hidden",
            type === "status" && "hidden"
          )}
        >
          <OptimizedImage
            src={originalPost.user.img || "general/noAvatar.png"}
            alt=""
            width={100}
            height={100}
            tr={true}
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <Link
              href={`/${originalPost.user.username}`}
              className="flex gap-4"
            >
              <div
                className={cn(
                  "relative size-10 rounded-full overflow-hidden",
                  type !== "status" && "hidden"
                )}
              >
                <OptimizedImage
                  src={originalPost.user.img || "general/noAvatar.png"}
                  alt=""
                  width={100}
                  height={100}
                  tr={true}
                />
              </div>

              <div
                className={cn(
                  "flex items-center gap-2 flex-wrap",
                  type === "status" && "flex-col !gap-0 !items-start"
                )}
              >
                <h1 className="text-md font-bold">
                  {originalPost.user.displayName}
                </h1>
                <span
                  className={cn(
                    "text-textGray",
                    type === "status" && "text-sm"
                  )}
                >
                  @{originalPost.user.username}
                </span>
                {type !== "status" && (
                  <span className="text-textGray">
                    {format(originalPost.createdAt)}
                  </span>
                )}
              </div>
            </Link>

            <PostInfo />
          </div>
          <Link
            href={`/${originalPost.user.username}/status/${originalPost.id}`}
          >
            <p className={cn("", type === "status" && "text-lg")}>
              {originalPost.desc}
            </p>
          </Link>
          {originalPost.img && (
            <OptimizedImage
              src={originalPost.img}
              alt=""
              width={600}
              height={600}
            />
          )}

          {type === "status" && (
            <span className="text-textGray">8:41 PM • Sept 9, 2025</span>
          )}

          <PostInteractions
            postId={originalPost.id}
            count={originalPost._count}
            isLiked={!!originalPost.likes.length}
            isReposted={!!originalPost.reposts.length}
            isSaved={!!originalPost.saves.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
