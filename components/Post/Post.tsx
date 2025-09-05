import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { getFileDetails } from "@/utils/imagekit/fileDetails";

import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import { icons } from "@/constants";
import cn from "clsx";
import OptimizedVideo from "../OptimizedVideo/OptimizedVideo";

const Post = async ({ fileId }: { fileId: string }) => {
  const fileDetails = await getFileDetails(fileId);

  return (
    <div className="p-4 border-y border-borderGray">
      <div className="flex items-center gap-2 text-sm mb-2 font-bold text-textGray">
        <icons.Repost className="size-[18px] text-textGray" />
        <span className="">Radosav Panic reposted</span>
      </div>

      <div className="flex gap-4">
        <div className="relative size-10 rounded-full overflow-hidden">
          <OptimizedImage
            src="/general/avatar.png"
            alt=""
            width={100}
            height={100}
            tr={true}
          />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-md font-bold">Radosav Panic</h1>
              <span className="text-textGray">@panicc_r</span>
              <span className="text-textGray">18h ago</span>
            </div>
            <PostInfo />
          </div>

          <p className="">
            The morning sky painted itself with shades of gold and soft blue.
            The sound of leaves dancing in the wind carried a calm I didn’t know
            I needed. Every breath felt lighter, every step felt slower, as if
            the world had pressed pause. In that quiet, I found a moment of
            peace, simple and complete.
          </p>
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

          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default Post;
