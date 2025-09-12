"use client";

import Post from "@/components/Post/Post";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { CommentWithDetails } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useActionState } from "react";
import { addComment } from "@/actions/action";

const Comments = ({
  comments,
  postId,
  username,
}: {
  comments: CommentWithDetails[];
  postId: number;
  username: string;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [state, formAction, isPending] = useActionState(addComment, {
    success: false,
    error: false,
  });

  return (
    <div className="">
      {user && (
        <form
          action={formAction}
          className="flex items-center justify-between gap-4 p-4"
        >
          <div className="relative size-10 rounded-full overflow-hidden">
            <OptimizedImage
              src={user?.imageUrl}
              alt="Radosav Panic"
              width={100}
              height={100}
              tr={true}
            />
          </div>
          <input type="number" name="postId" hidden readOnly value={postId} />
          <input type="text" name="username" hidden readOnly value={username} />
          <input
            type="text"
            name="desc"
            className="flex-1 bg-transparent outline-none p-2 text-xl"
            placeholder="Post your reply"
          />
          <button
            disabled={isPending}
            className="py-2 px-4 font-bold bg-white text-black rounded-full cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
          >
            {isPending ? "Replying" : "Reply"}
          </button>
        </form>
      )}

      {state.error && (
        <span className="text-red-300 p-4">Something went wrong!</span>
      )}

      {comments.map((comment) => (
        <div key={comment.id}>
          <Post post={comment} type="comment" />
        </div>
      ))}
    </div>
  );
};

export default Comments;
