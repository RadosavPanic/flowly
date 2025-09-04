import Feed from "@/components/Feed/Feed";
import Share from "@/components/Post/Share";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between text-textGray font-bold border-b border-borderGray px-4 pt-4">
        <Link
          href="/"
          className="flex items-center border-b-4 border-iconBlue pb-3"
        >
          For you
        </Link>

        <Link href="/" className="flex items-center border-b-4 pb-3">
          Following
        </Link>

        <Link href="/" className="hidden md:flex items-center border-b-4 pb-3">
          React.js
        </Link>

        <Link href="/" className="hidden md:flex items-center border-b-4 pb-3">
          Following
        </Link>

        <Link href="/" className="hidden md:flex items-center border-b-4 pb-3">
          CSS
        </Link>
      </div>

      <Share />
      <Feed />
    </div>
  );
}
