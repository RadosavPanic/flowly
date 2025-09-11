import Feed from "@/components/Feed/Feed";
import Share from "@/components/Post/Share";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div>
      <div className="px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <div className="flex-1 flex items-center justify-center">
          <Link
            className="pb-3 flex items-center text-textGrayLight border-b-4 border-iconBlue"
            href="/"
          >
            For you
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Link className="pb-3 flex items-center" href="/">
            Following
          </Link>
        </div>
      </div>

      <Share />
      <Feed userProfileId={userId!} />
    </div>
  );
}
