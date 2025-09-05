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
  customMetaData?: { sensitive: boolean };
};
