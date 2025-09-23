"use client";

import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import { useRouter } from "next/navigation";
import React from "react";
import { icons } from "@/constants";

const PostModal = () => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer hover:bg-gray-700 rounded-full px-2"
            onClick={closeModal}
          >
            X
          </div>
          <div className="text-iconBlue font-bold cursor-pointer">Drafts</div>
        </div>
        {/* CENTER */}
        <div className="py-8 flex gap-4 items-start">
          <div className="relative size-10 rounded-full overflow-hidden">
            <OptimizedImage
              src="general/avatar.png"
              alt="Radosav Panic"
              width={100}
              height={100}
              tr={true}
            />
          </div>
          <textarea
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height =
                e.currentTarget.scrollHeight + "px";
            }}
            placeholder="What is happening?"
            className="flex-1 bg-transparent outline-none text-lg resize-none leading-relaxed"
          />
        </div>
        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4">
          <div className="flex gap-4 flex-wrap">
            <icons.ImageIcon className="size-5 cursor-pointer text-iconBlue" />
            <icons.Gif className="size-5 cursor-pointer text-iconBlue" />
            <icons.Poll className="size-5 cursor-pointer text-iconBlue" />
            <icons.Emoji className="size-5 cursor-pointer text-iconBlue" />
            <icons.Schedule className="size-5 cursor-pointer text-iconBlue" />
            <icons.Location className="size-5 cursor-pointer text-iconBlue" />
          </div>
          <button className="py-2 px-5 text-black bg-white rounded-full font-bold cursor-pointer">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
