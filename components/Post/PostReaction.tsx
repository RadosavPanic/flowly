import React from "react";
import cn from "clsx";

type PostReactionType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hoverClass: string;
  isLiked?: boolean;
  isReposted?: boolean;
  value: number;
};

const PostReaction = ({
  icon: Icon,
  hoverClass,
  isLiked,
  isReposted,
  value,
}: PostReactionType) => (
  <>
    <Icon
      className={cn(
        "size-5",
        isLiked
          ? "text-iconPink"
          : isReposted
          ? "text-iconGreen"
          : "text-textGray",

        hoverClass
      )}
    />
    <span
      className={cn(
        "text-sm",
        isLiked
          ? "text-iconPink"
          : isReposted
          ? "text-iconGreen"
          : "text-textGray",
        hoverClass
      )}
    >
      {value}
    </span>
  </>
);

export default PostReaction;
