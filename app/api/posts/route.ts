import { prisma } from "@/utils/prisma/prisma";
import { buildPostIncludeQuery } from "@/utils/prisma/prisma.queries";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userProfileId = searchParams.get("user");
  const page = searchParams.get("cursor");
  const LIMIT = 3;

  const { userId } = await auth();
  if (!userId) return;

  const whereCondition =
    userProfileId !== "undefined"
      ? { parentPostId: null, userId: userProfileId as string }
      : {
          parentPostId: null,
          userId: {
            in: [
              userId,
              ...(
                await prisma.follow.findMany({
                  where: { followerId: userId },
                  select: { followingId: true },
                })
              ).map((follow) => follow.followingId),
            ],
          },
        };

  const postIncludeQuery = buildPostIncludeQuery(userId);

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      repost: {
        include: postIncludeQuery,
      },
      ...postIncludeQuery,
    },
    take: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
    orderBy: { createdAt: "desc" },
  });

  const totalPosts = await prisma.post.count({ where: whereCondition });

  const hasMorePosts = Number(page) * LIMIT < totalPosts;

  return Response.json({ posts, hasMorePosts });
}
