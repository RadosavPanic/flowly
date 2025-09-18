import Post from "@/components/Post/Post";
import { prisma } from "@/utils/prisma/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";
import { buildPostIncludeQuery } from "@/utils/prisma/prisma.queries";

const Feed = async ({ userProfileId }: { userProfileId: string }) => {
  const { userId } = await auth();

  if (!userId) return;

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }
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
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}

      <InfiniteFeed />
    </div>
  );
};

export default Feed;
