import React from "react";
import cn from "clsx";

type PostReactionType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hoverClass: string;
};

const PostReaction = ({ icon: Icon, hoverClass }: PostReactionType) => (
  <div className="flex items-center gap-2 cursor-pointer group">
    <Icon className={cn("size-5 text-textGray", hoverClass)} />
    <span className={cn("text-sm text-textGray", hoverClass)}>157</span>
  </div>
);

export default PostReaction;
