import Post from "@/components/Post/Post";
import { prisma } from "@/utils/prisma/prisma";

const Feed = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post type="content" />
        </div>
      ))}
    </div>
  );
};

export default Feed;
