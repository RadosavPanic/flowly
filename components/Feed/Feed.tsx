import Post from "@/components/Post/Post";
import { prisma } from "@/utils/prisma/prisma";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Feed = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="">
      <SignedIn>
        <UserButton />
      </SignedIn>
      {posts.map((post) => (
        <div key={post.id}>
          <Post type="content" />
        </div>
      ))}
    </div>
  );
};

export default Feed;
