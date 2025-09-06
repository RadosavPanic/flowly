import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { getFileDetails } from "@/utils/imagekit/fileDetails";

import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import { icons } from "@/constants";
import cn from "clsx";
import OptimizedVideo from "../OptimizedVideo/OptimizedVideo";
import Link from "next/link";

const Post = async ({ type }: PostType) => {
  const fileDetails = await getFileDetails("68bb11c75c7cd75eb88e84e0");

  return (
    <div className="p-4 border-y border-borderGray">
      <div className="flex items-center gap-2 text-sm mb-2 font-bold text-textGray">
        <icons.Repost className="size-[18px] text-textGray" />
        <span className="">Radosav Panic reposted</span>
      </div>

      <div className={cn("flex gap-4", type === "status" && "flex-col")}>
        <div
          className={cn(
            "relative size-10 rounded-full overflow-hidden",
            type === "status" && "hidden"
          )}
        >
          <OptimizedImage
            src="/general/avatar.png"
            alt=""
            width={100}
            height={100}
            tr={true}
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <Link href="/panicc_r" className="flex gap-4">
              <div
                className={cn(
                  "relative size-10 rounded-full overflow-hidden",
                  type !== "status" && "hidden"
                )}
              >
                <OptimizedImage
                  src="/general/avatar.png"
                  alt=""
                  width={100}
                  height={100}
                  tr={true}
                />
              </div>

              <div
                className={cn(
                  "flex items-center gap-2 flex-wrap",
                  type === "status" && "flex-col !gap-0 !items-start"
                )}
              >
                <h1 className="text-md font-bold">Radosav Panic</h1>
                <span
                  className={cn(
                    "text-textGray",
                    type === "status" && "text-sm"
                  )}
                >
                  @panicc_r
                </span>
                {type !== "status" && (
                  <span className="text-textGray">18h ago</span>
                )}
              </div>
            </Link>

            <PostInfo />
          </div>
          <Link href="/panicc_r/status/123">
            <p className={cn("", type === "status" && "text-lg")}>
              The morning sky painted itself with shades of gold and soft blue.
              The sound of leaves dancing in the wind carried a calm I didn’t
              know I needed. Every breath felt lighter, every step felt slower,
              as if the world had pressed pause. In that quiet, I found a moment
              of peace, simple and complete.
            </p>
          </Link>

          {fileDetails && fileDetails.fileType === "image" ? (
            <OptimizedImage
              src={fileDetails.filePath}
              alt=""
              width={fileDetails.width}
              height={fileDetails.height}
              className={cn(
                "",
                fileDetails.customMetadata?.sensitive && "blur-lg"
              )}
            />
          ) : (
            <OptimizedVideo
              src={fileDetails.filePath}
              className={cn(
                "",
                fileDetails.customMetadata?.sensitive && "blur-lg"
              )}
            />
          )}

          {type === "status" && (
            <span className="text-textGray">8:41 PM • Sept 9, 2025</span>
          )}

          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default Post;
