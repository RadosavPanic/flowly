import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowly - Share Your Voice, Catch the Vibe",
  description:
    "Flowly is the social platform where conversations flow freely. Share your thoughts, connect with others, and stay in the moment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
