import Link from "next/link";
import React from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const Recommendations = () => {
  return (
    <div className="p-4 rounded-2xl border border-borderGray flex flex-col gap-4">
      {/* USER CARD */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden size-10">
            <OptimizedImage
              src="general/elonmusk.png"
              alt="Elon Musk"
              width={100}
              height={100}
              tr={true}
            />
          </div>

          <div className="">
            <h1 className="text-md font-bold">Elon Musk</h1>
            <span className="text-textGray text-sm">@elonmusk</span>
          </div>
        </div>

        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden size-10">
            <OptimizedImage
              src="general/lexfridman.png"
              alt="Elon Musk"
              width={100}
              height={100}
              tr={true}
            />
          </div>

          <div className="">
            <h1 className="text-md font-bold">Lex Fridman</h1>
            <span className="text-textGray text-sm">@lexfridman</span>
          </div>
        </div>

        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden size-10">
            <OptimizedImage
              src="general/dogecoin.png"
              alt="Elon Musk"
              width={100}
              height={100}
              tr={true}
            />
          </div>

          <div className="">
            <h1 className="text-md font-bold">DogeCoin</h1>
            <span className="text-textGray text-sm">@dogecoin</span>
          </div>
        </div>

        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
