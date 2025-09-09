import React from "react";
import Post from "@/components/Post/Post";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { CommentWithDetails } from "@/types";

const Comments = ({
  comments,
  postId,
  username,
}: {
  comments: CommentWithDetails[];
  postId: number;
  username: string;
}) => {
  return (
    <div className="">
      <form className="flex items-center justify-between gap-4 p-4">
        <div className="relative size-10 rounded-full overflow-hidden">
          <OptimizedImage
            src="general/avatar.png"
            alt="Radosav Panic"
            width={100}
            height={100}
            tr={true}
          />
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent outline-none p-2 text-xl"
          placeholder="Post your reply"
        />
        <button className="py-2 px-4 font-bold bg-white text-black rounded-full">
          Reply
        </button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Post post={comment} type="comment" />
        </div>
      ))}
    </div>
  );
};

export default Comments;
