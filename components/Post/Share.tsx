"use client";

import { useState } from "react";
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
import { useUser } from "@clerk/nextjs";
import z from "zod";
import { addPost } from "@/actions/action";
import { useRouter } from "next/navigation";
import { icons } from "@/constants";

const PostSchema = z.object({
  desc: z.string().max(140),
  isSensitive: z.boolean().optional(),
});

const Share = () => {
  const [media, setMedia] = useState<File | null>();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<EditorSettings>({
    type: "original",
    sensitive: false,
  });
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const { user } = useUser();
  if (!user) return;

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setMedia(e.target.files[0]);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    const validatedFields = PostSchema.safeParse({
      desc,
      isSensitive: settings.sensitive,
    });

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      setErrorMessage("Description too long or invalid input");
      return;
    }

    let uploadResult;

    try {
      if (media) {
        const bytes = await media.arrayBuffer();
        const buffer = Buffer.from(bytes).toString("base64");

        const authParams = await authenticateUser();

        const { signature, expire, token, publicKey } = authParams;

        const transformation = `w-600,${
          settings.type === "square"
            ? "ar-1-1"
            : settings.type === "wide"
            ? "ar-16-9"
            : ""
        }`;

        uploadResult = await upload({
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
      }

      type ExtendedFileType = "image" | "video";

      const result = await addPost({
        desc: validatedFields.data.desc,
        isSensitive: validatedFields.data.isSensitive,
        userId: user.id,
        img: uploadResult?.fileType === "image" ? uploadResult?.filePath : "",
        video:
          (uploadResult?.fileType as ExtendedFileType) === "video"
            ? uploadResult?.filePath
            : "",
      });

      if (!result) throw new Error("DB Insert Failed");

      setMedia(null);
      setDesc("");
      setSettings({ type: "original", sensitive: false });

      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (uploadError) {
      if (uploadError instanceof ImageKitAbortError)
        console.error("Upload aborted:", uploadError.reason);
      else if (uploadError instanceof ImageKitInvalidRequestError)
        console.error("Invalid request:", uploadError.message);
      else if (uploadError instanceof ImageKitUploadNetworkError)
        console.error("Network error:", uploadError.message);
      else if (uploadError instanceof ImageKitServerError)
        console.error("Server error:", uploadError.message);
      else console.error("Error occured:", uploadError);
    } finally {
      setIsPending(false);
    }
  };

  const previewUrl = media ? URL.createObjectURL(media) : null;

  return (
    <form className="p-4 flex gap-4" onSubmit={handleUpload}>
      <div className="relative size-10 rounded-full overflow-hidden">
        <OptimizedImage
          src={user?.imageUrl}
          alt=""
          width={100}
          height={100}
          tr={true}
        />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <textarea
          name="desc"
          autoComplete="off"
          rows={1}
          placeholder="What is happening?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent outline-none placeholder:text-textGray text-xl resize-none leading-relaxed"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

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
              <icons.ImageIcon className="size-5 cursor-pointer text-iconBlue" />
            </label>

            <icons.Gif className="size-5 cursor-pointer text-iconBlue" />
            <icons.Poll className="size-5 cursor-pointer text-iconBlue" />
            <icons.Emoji className="size-5 cursor-pointer text-iconBlue" />
            <icons.Schedule className="size-5 cursor-pointer text-iconBlue" />
            <icons.Location className="size-5 cursor-pointer text-iconBlue" />
          </div>
          <button
            type="submit"
            className="bg-white text-black font-bold rounded-full py-2 px-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Share;
