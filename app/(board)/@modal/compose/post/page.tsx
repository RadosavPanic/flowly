"use client";

import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import { useRouter } from "next/navigation";
import React from "react";

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
          <div className="cursor-pointer" onClick={closeModal}>
            X
          </div>
          <div className="text-iconBlue font-bold">Drafts</div>
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
            <OptimizedImage
              src="icons/image.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <OptimizedImage
              src="icons/gif.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <OptimizedImage
              src="icons/poll.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <OptimizedImage
              src="icons/emoji.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <OptimizedImage
              src="icons/schedule.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <OptimizedImage
              src="icons/location.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button className="py-2 px-5 text-black bg-white rounded-full font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
