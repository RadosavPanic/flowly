"use client";

import { icons } from "@/constants";
import React from "react";
import PostReaction from "./PostReaction";

const PostInteractions = () => {
  return (
    <div className="flex items-center justify-between gap-4 xsm:gap-16 md:gap-32 my-2 text-white-100">
      <div className="flex justify-between items-center flex-1">
        <PostReaction
          icon={icons.Comment}
          hoverClass="group-hover:text-iconBlue"
        />

        <PostReaction
          icon={icons.Repost}
          hoverClass="group-hover:text-iconGreen"
        />

        <PostReaction
          icon={icons.Like}
          hoverClass="group-hover:text-iconPink"
        />
      </div>

      <div className="flex items-center gap-2">
        <icons.Save className="size-5 text-textGray hover:text-iconBlue cursor-pointer" />

        <icons.Share className="size-5 text-textGray hover:text-iconBlue cursor-pointer" />
      </div>
    </div>
  );
};

export default PostInteractions;
