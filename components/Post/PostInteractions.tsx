"use client";

import { icons } from "@/constants";
import React, { useOptimistic, useState } from "react";
import PostReaction from "./PostReaction";
import { PostInteractionsType } from "@/types";
import cn from "clsx";
import { likePost, rePost, savePost } from "@/actions/action";

const PostInteractions = ({
  postId,
  count: { likes, reposts, comments },
  isLiked,
  isReposted,
  isSaved,
}: PostInteractionsType) => {
  const [state, setState] = useState({
    likes: likes,
    isLiked: isLiked,
    reposts: reposts,
    isReposted,
    isSaved,
  });

  const likeAction = async () => {
    addOptimisticCount("like");
    await likePost(postId);
    setState((prev) => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
  };

  const repostAction = async () => {
    addOptimisticCount("repost");
    await rePost(postId);
    setState((prev) => ({
      ...prev,
      reposts: prev.isReposted ? prev.reposts - 1 : prev.reposts + 1,
      isReposted: !prev.isReposted,
    }));
  };

  const saveAction = async () => {
    addOptimisticCount("save");
    await savePost(postId);
    setState((prev) => ({
      ...prev,
      isSaved: !prev.isSaved,
    }));
  };

  const [optimisticCount, addOptimisticCount] = useOptimistic(
    state,
    (prev, type: "like" | "repost" | "save") => {
      if (type === "like") {
        return {
          ...prev,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
          isLiked: !prev.isLiked,
        };
      }

      if (type === "repost") {
        return {
          ...prev,
          reposts: prev.isReposted ? prev.reposts - 1 : prev.reposts + 1,
          isReposted: !prev.isReposted,
        };
      }

      if (type === "save") {
        return {
          ...prev,
          isSaved: !prev.isSaved,
        };
      }

      return prev;
    }
  );

  return (
    <div className="flex items-center justify-between gap-4 xsm:gap-16 md:gap-32 my-2 text-white-100">
      <div className="flex justify-between items-center flex-1">
        <button className="flex items-center gap-2 cursor-pointer group">
          <PostReaction
            icon={icons.Comment}
            hoverClass="group-hover:text-iconBlue"
            value={comments}
          />
        </button>

        <form action={repostAction}>
          <button className="flex items-center gap-2 cursor-pointer group">
            <PostReaction
              icon={icons.Repost}
              hoverClass="group-hover:text-iconGreen"
              value={optimisticCount.reposts}
              isReposted={optimisticCount.isReposted}
            />
          </button>
        </form>

        <form action={likeAction}>
          <button className="flex items-center gap-2 cursor-pointer group">
            <PostReaction
              icon={icons.Like}
              hoverClass="group-hover:text-iconPink"
              value={optimisticCount.likes}
              isLiked={optimisticCount.isLiked}
            />
          </button>
        </form>

        <div className="flex items-center gap-2">
          <form action={saveAction}>
            <button className="flex items-center gap-2 cursor-pointer">
              <icons.Save
                className={cn(
                  "size-5 cursor-pointer",
                  optimisticCount.isSaved
                    ? "text-iconBlue"
                    : "text-textGray hover:text-iconBlue"
                )}
              />
            </button>
          </form>

          <icons.Share className="size-5 text-textGray hover:text-iconBlue cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PostInteractions;
