"use client";

import React, { useState } from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/next";

import { authenticateUser } from "@/utils/imagekit";

const Share = () => {
  const [media, setMedia] = useState<File | null>();

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setMedia(e.target.files[0]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!media) {
      alert("Please select files to upload");
      return;
    }

    const bytes = await media.arrayBuffer();
    const buffer = Buffer.from(bytes).toString("base64");

    let authParams;

    try {
      authParams = await authenticateUser();
    } catch (authError) {
      console.error("Failed to authenticate for upload", authError);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const response = await upload({
        expire,
        token,
        signature,
        publicKey,
        file: buffer,
        fileName: media.name,
        folder: "/posts",
        transformation: {
          pre: "w-600",
        },
      });

      if (response) alert(`Success! URL: ${response.url}`);
    } catch (uploadError) {
      if (uploadError instanceof ImageKitAbortError)
        console.error("Upload aborted:", uploadError.reason);
      else if (uploadError instanceof ImageKitInvalidRequestError)
        console.error("Invalid request:", uploadError.message);
      else if (uploadError instanceof ImageKitUploadNetworkError)
        console.error("Network error:", uploadError.message);
      else if (uploadError instanceof ImageKitServerError)
        console.error("Server error:", uploadError.message);
      else console.error("Upload error:", uploadError);
    }
  };

  return (
    <form className="p-4 flex gap-4" onSubmit={handleUpload}>
      <div className="relative size-10 rounded-full overflow-hidden">
        <OptimizedImage
          src="general/avatar.png"
          alt=""
          width={100}
          height={100}
          tr={true}
        />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          name="desc"
          autoComplete="off"
          placeholder="What is happening?"
          className="bg-transparent outline-none placeholder:text-textGray text-xl"
        />

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
            />
            <label htmlFor="file">
              <OptimizedImage
                src="icons/image.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
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
          <button
            type="submit"
            className="bg-white text-black font-bold rounded-full py-2 px-4 cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default Share;
