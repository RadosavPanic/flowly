"use client";

import React, { useState } from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import Image from "next/image";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/next";
import { EditorSettings } from "@/types";

import { authenticateUser } from "@/utils/imagekit";
import ImageEditor from "../ImageEditor/ImageEditor";
import cn from "clsx";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Share = () => {
  const [media, setMedia] = useState<File | null>();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<EditorSettings>({
    type: "original",
    sensitive: false,
  });

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

    const transformation = `w-600, ${
      settings.type === "square"
        ? "ar-1-1"
        : settings.type === "wide"
        ? "ar-16-9"
        : ""
    }`;

    try {
      await upload({
        expire,
        token,
        signature,
        publicKey,
        file: buffer,
        fileName: media.name,
        folder: "/posts",
        ...(media.type.includes("image") && {
          transformation: {
            pre: transformation,
          },
        }),
        customMetadata: {
          sensitive: settings.sensitive,
        },
      });
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

  const previewUrl = media ? URL.createObjectURL(media) : null;

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
      <SignedIn>
        <UserButton />
      </SignedIn>

      <div className="flex-1 flex flex-col gap-4">
        <textarea
          name="desc"
          autoComplete="off"
          rows={1}
          placeholder="What is happening?"
          className="bg-transparent outline-none placeholder:text-textGray text-xl resize-none leading-relaxed"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
        />
        {media?.type.includes("image") && previewUrl && (
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={previewUrl}
              alt=""
              width={600}
              height={600}
              className={cn(
                "w-full",
                settings.type === "original"
                  ? "h-full object-contain"
                  : settings.type === "square"
                  ? "aspect-square object-cover"
                  : "aspect-video object-cover"
              )}
            />
            <div
              className="absolute top-2 left-2 bg-black/50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </div>
            <div
              className="absolute top-2 right-2 bg-black/50 text-white size-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}

        {media?.type.includes("video") && previewUrl && (
          <div className="relative">
            <video src={previewUrl} controls className="rounded-xl" />
            <div
              className="absolute top-2 right-2 bg-black/50 text-white size-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}

        {isEditorOpen && previewUrl && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewUrl={previewUrl}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
              accept="image/*,video/*"
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
