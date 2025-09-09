"use client";

import { icons } from "@/constants";
import React from "react";
import PostReaction from "./PostReaction";
import { PostInteractionsType } from "@/types";
import cn from "clsx";

const PostInteractions = ({
  count: { likes, reposts, comments },
  isLiked,
  isReposted,
  isSaved,
}: PostInteractionsType) => {
  return (
    <div className="flex items-center justify-between gap-4 xsm:gap-16 md:gap-32 my-2 text-white-100">
      <div className="flex justify-between items-center flex-1">
        <PostReaction
          icon={icons.Comment}
          hoverClass="group-hover:text-iconBlue"
          value={comments}
        />

        <PostReaction
          icon={icons.Repost}
          hoverClass="group-hover:text-iconGreen"
          value={reposts}
          isReposted={isReposted}
        />

        <PostReaction
          icon={icons.Like}
          hoverClass="group-hover:text-iconPink"
          value={likes}
          isLiked={isLiked}
        />
      </div>

      <div className="flex items-center gap-2">
        <icons.Save
          className={cn(
            "size-5 cursor-pointer",
            isSaved ? "text-iconBlue" : "text-textGray hover:text-iconBlue"
          )}
        />

        <icons.Share className="size-5 text-textGray hover:text-iconBlue cursor-pointer" />
      </div>
    </div>
  );
};

export default PostInteractions;
