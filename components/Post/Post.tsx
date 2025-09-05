import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { getFileDetails } from "@/utils/imagekit/fileDetails";

import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import { icons } from "@/constants";

const Post = async () => {
  const fileDetails = await getFileDetails("68bac5215c7cd75eb877da81");

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
            doloribus iure dolorem odit consectetur. Commodi eius odit, libero
            doloribus ea veritatis itaque beatae rem quam nihil officiis nulla
            qui corporis.
          </p>
          {fileDetails && (
            <OptimizedImage
              src={fileDetails.filePath}
              alt=""
              width={fileDetails.width}
              height={fileDetails.height}
              className={fileDetails.customMetaData?.sensitive ? "blur-lg" : ""}
            />
          )}

          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default Post;
