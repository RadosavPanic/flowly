import { menuList } from "@/constants";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import Link from "next/link";
import React from "react";
import Socket from "@/components/Socket/Socket";
import Notification from "../Notification/Notification";

const LeftBar = () => {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-4 pb-8">
      {/* LOGO MENU BUTTON */}

      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link href="/" className="p-2 rounded-full hover:bg-hoverMenuItem">
          <OptimizedImage
            src="icons/flowly.svg"
            alt="logo"
            width={24}
            height={24}
          />
        </Link>

        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item, i) => (
            <div key={item.id || i}>
              {i === 2 && (
                <div>
                  <Notification />
                </div>
              )}
              <Link
                href={item.link}
                className="flex items-center gap-4 p-2 rounded-full hover:bg-hoverMenuItem"
              >
                <OptimizedImage
                  src={`/icons/${item.icon}`}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <span className="hidden xxl:inline">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full size-12 flex items-center justify-center xxl:hidden"
        >
          <OptimizedImage
            src="icons/post.svg"
            alt="new post"
            width={24}
            height={24}
          />
        </Link>

        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>

      <Socket />
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-10 relative rounded-full overflow-hidden">
            <OptimizedImage
              src="/general/avatar.png"
              alt="paniccr"
              width={100}
              height={100}
              tr={true}
            />
          </div>

          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">Radosav Panic</span>
            <span className="text-sm text-textGray">@panicc_r</span>
          </div>
        </div>

        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  );
};

export default LeftBar;
