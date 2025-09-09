import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Flowly - Share Your Voice, Catch the Vibe",
  description:
    "Flowly is the social platform where conversations flow freely. Share your thoughts, connect with others, and stay in the moment.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className="bg-black/100 text-white-100 font-sans">
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
