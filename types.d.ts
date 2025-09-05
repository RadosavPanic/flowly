type EditorSettings = {
  type: "original" | "wide" | "square";
  sensitive: boolean;
};

type FileDetails = {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: string;
  customMetadata?: { sensitive: boolean };
};

type ImageType = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

type VideoType = {
  src: string;
  className?: string;
};
