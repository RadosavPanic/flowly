import Image from "next/image";
import React from "react";
import cn from "clsx";
import { icons } from "@/constants";
import { EditorSettings } from "@/types";

type ImageEditorType = {
  onClose: () => void;
  previewUrl: string;
  settings: EditorSettings;
  setSettings: React.Dispatch<React.SetStateAction<EditorSettings>>;
};

type SettingsType = "original" | "wide" | "square";

const ImageEditor = ({
  onClose,
  previewUrl,
  settings,
  setSettings,
}: ImageEditorType) => {
  const handleChangeSensitive = (sensitive: boolean) => {
    setSettings((prev) => ({ ...prev, sensitive }));
  };

  const handleChangeType = (type: SettingsType) => {
    setSettings((prev) => ({ ...prev, type }));
  };

  return (
    <div className="fixed w-screen h-screen left-0 top-0 bg-black/75 z-10 flex items-center justify-center">
      <div className="bg-black rounded-xl p-12 flex flex-col gap-6">
        {/* TOP NAV */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <icons.Back className="size-8 cursor-pointer" onClick={onClose} />
            <h1 className="font-bold text-xl">Media Settings</h1>
          </div>
          <button
            className="py-2 px-4 rounded-full bg-white text-black font-bold cursor-pointer"
            onClick={onClose}
          >
            Save
          </button>
        </div>

        {/* IMAGE CONTAINER */}
        <div className="w-[600px] h-[600px] flex items-center">
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
        </div>

        {/* SETTINGS */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleChangeType("original")}
            >
              <icons.Original
                className={cn(
                  "size-8",
                  settings.type === "original"
                    ? "text-iconBlue"
                    : "text-[#e7e9ea]"
                )}
              />
              Original
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleChangeType("wide")}
            >
              <icons.Wide
                className={cn(
                  "size-8",
                  settings.type === "wide" ? "text-iconBlue" : "text-[#e7e9ea]"
                )}
              />
              Wide
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleChangeType("square")}
            >
              <icons.Square
                className={cn(
                  "size-8",
                  settings.type === "square"
                    ? "text-iconBlue"
                    : "text-[#e7e9ea]"
                )}
              />
              Square
            </div>
          </div>

          <div
            className={cn(
              "cursor-pointer py-1 px-4 rounded-full text-black",
              settings.sensitive
                ? "bg-red-500 !text-white"
                : "bg-white !text-black"
            )}
            onClick={() => handleChangeSensitive(!settings.sensitive)}
          >
            Sensitive
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
