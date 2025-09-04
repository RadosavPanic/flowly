import React from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const PostInfo = () => {
  return (
    <div className="cursor-pointer size-4 relative">
      <OptimizedImage src="icons/infoMore.svg" alt="" width={16} height={16} />
    </div>
  );
};

export default PostInfo;
