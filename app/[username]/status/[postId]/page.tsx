import Comments from "@/components/Comments/Comments";
import Post from "@/components/Post/Post";
import { icons } from "@/constants";
import Link from "next/link";
import React from "react";

const StatusPage = () => {
  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/65">
        <Link href="/">
          <icons.Back className="size-4" />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" />
      <Comments />
    </div>
  );
};

export default StatusPage;
