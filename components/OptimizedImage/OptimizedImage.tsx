"use client";

import { Image } from "@imagekit/next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type ImageType = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const OptimizedImage = ({
  src,
  width,
  height,
  alt,
  className,
  tr,
}: ImageType) => {
  return (
    <Image
      urlEndpoint={urlEndpoint}
      src={src}
      width={width}
      height={height}
      {...(tr ? { transformation: [{ width, height }] } : {})}
      alt={alt}
      className={className}
    />
  );
};

export default OptimizedImage;
