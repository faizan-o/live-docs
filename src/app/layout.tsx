import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import LiveBlocksProvider from "@/components/provider/liveblocks";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "LiveDocs - A Modern Collaboration Platform",
  description:
    "LiveDocs is a collaborative online document editor that allows multiple users to create, edit, and share documents in real-time. With seamless integration, intuitive design, and powerful formatting tools, LiveDocs makes it easy to collaborate and manage your documents, whether you're working alone or with a team.",
  keywords: [
    "live",
    "collaboration",
    "docs",
    "google",
    "docs",
    "clone",
    "server",
  ],
  openGraph: {
    title: "LiveDocs - A Modern Collaboration Platform",
    description:
      "LiveDocs is a collaborative online document editor that allows multiple users to create, edit, and share documents in real-time. With seamless integration, intuitive design, and powerful formatting tools, LiveDocs makes it easy to collaborate and manage your documents, whether you're working alone or with a team.",
    images: [
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://livedocs.vercel.app"
      }/images/logo.png`,
    ],
    siteName: "LiveDocs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#3371FF" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(poppins.variable, "custom-scrollbar font-poppins")}>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            height={3}
            crawl={true}
            easing="ease"
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <LiveBlocksProvider>{children}</LiveBlocksProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
