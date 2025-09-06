import type { Metadata } from "next";
import "./globals.css";
import LeftBar from "@/components/LeftBar/LeftBar";
import RightBar from "@/components/RightBar/RightBar";

export const metadata: Metadata = {
  title: "Flowly - Share Your Voice, Catch the Vibe",
  description:
    "Flowly is the social platform where conversations flow freely. Share your thoughts, connect with others, and stay in the moment.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black/100 text-white-100 font-sans">
        <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
          <div className="px-2 xsm:px-4 xxl:px-8">
            <LeftBar />
          </div>

          <div className="flex-1 lg:min-w-[600px] border-x border-borderGray">
            {children}
            {modal}
          </div>

          <div className="flex-1 hidden lg:flex ml-4 md:ml-8">
            <RightBar />
          </div>
        </div>
      </body>
    </html>
  );
}
