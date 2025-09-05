"use client";

import { Video } from "@imagekit/next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const OptimizedVideo = ({ src, className }: VideoType) => {
  return (
    <Video
      urlEndpoint={urlEndpoint}
      src={src}
      controls
      width={1920}
      height={1080}
      className={className}
      transformation={[
        {
          width: 1920,
          height: 1080,
          quality: 90,
        },
      ]}
    />
  );
};

export default OptimizedVideo;
