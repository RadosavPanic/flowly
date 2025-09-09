import { Post as PostType } from "./app/generated/prisma";

type SearchParamProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

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

type UserSummary = {
  displayName: string | null;
  username: string;
  img: string | null;
};

type Engagement = {
  _count: { likes: number; reposts: number; comments: number };
  likes: { id: number }[];
  reposts: { id: number }[];
  saves: { id: number }[];
};

type PostWithDetails = PostType &
  Engagement & {
    user: UserSummary;
    repost?: (PostType & Engagement & { user: UserSummary }) | null;
  };

type CommentWithDetails = PostType &
  Engagement & {
    user: UserSummary;
  };

type PostInteractionsType = {
  count: {
    likes: number;
    reposts: number;
    comments: number;
  };
  isLiked: boolean;
  isReposted: boolean;
  isSaved: boolean;
};
