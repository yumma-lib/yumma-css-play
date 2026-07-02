import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const description =
  "Zero-config, fully responsive playground powered by the Monaco editor.";

export const metadata: Metadata = {
  title: "Yumma CSS Play",
  description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL("https://play.yummacss.com"),
  openGraph: {
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="bg-surface">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
