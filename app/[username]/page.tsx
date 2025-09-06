import Link from "next/link";
import React from "react";
import { icons } from "@/constants";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import Feed from "@/components/Feed/Feed";

const UserPage = () => {
  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/65">
        <Link href="/">
          <icons.Back className="size-4" />
        </Link>
        <h1 className="font-bold text-lg">Radosav Panic</h1>
      </div>

      {/* INFO */}
      <div className="">
        <div className="relative w-full">
          <div className="w-full aspect-[3/1] relative">
            <OptimizedImage
              src="general/cover.png"
              alt=""
              width={600}
              height={200}
              tr={true}
            />
          </div>

          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <OptimizedImage
              src="general/avatar.png"
              alt=""
              width={100}
              height={100}
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
          <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
            Follow
          </button>
        </div>

        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          <div className="">
            <h1 className="text-2xl font-bold">Radosav Panic</h1>
            <span className="text-textGray text-sm">@panicc_r</span>
          </div>
          <p>Radosav Youtube Channel</p>
          {/* JOB & LOCATION & DATE */}
          <div className="flex gap-4 text-base">
            <div className="flex items-center gap-2">
              <icons.Location className="size-5" />
              <span>Belgrade, Serbia</span>
            </div>

            <div className="flex items-center gap-2">
              <icons.Date className="size-5" />
              <span>Joined May 2021</span>
            </div>
          </div>
          {/* FOLLOWINGS & FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">104</span>
              <span className="text-textGray text-base">Following</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold">142K</span>
              <span className="text-textGray text-base">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEED */}
      <Feed />
    </div>
  );
};

export default UserPage;
