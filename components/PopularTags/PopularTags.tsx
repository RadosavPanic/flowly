import React from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { icons } from "@/constants";

const PopularTags = () => {
  return (
    <div className="p-4 rounded-2xl border border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">{`What's happening`}</h1>
      {/* TREND EVENTS */}
      <div className="flex gap-4">
        <div className="relative size-20 rounded-xl overflow-hidden">
          <OptimizedImage
            src="general/event.png"
            alt="event"
            width={120}
            height={120}
            tr={true}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-textGrayLight">
            A new direction for the arrival of black gold
          </h2>
          <span className="text-sm text-textGray">20h ago</span>
        </div>
      </div>
      {/* TOPICS */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm">Technology • Trending</span>
          <icons.InfoMore className="w-4" />
        </div>

        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-textGray text-sm">20K posts</span>
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm">Science • Discovery</span>
          <icons.InfoMore className="w-4" />
        </div>

        <h2 className="text-textGrayLight font-bold">SpaceX</h2>
        <span className="text-textGray text-sm">17K posts</span>
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm">Cars • Innovation</span>
          <icons.InfoMore className="w-4" />
        </div>

        <h2 className="text-textGrayLight font-bold">Tesla</h2>
        <span className="text-textGray text-sm">17K posts</span>
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm">Sports • Football</span>
          <icons.InfoMore className="w-4" />
        </div>

        <h2 className="text-textGrayLight font-bold">World Cup</h2>
        <span className="text-textGray text-sm">17K posts</span>
      </div>
    </div>
  );
};

export default PopularTags;
