import "@/styles/out.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const description = "Yumma CSS Play based on Sandpack.";

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
      <body style={{ backgroundColor: "#151724" }}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#21243f",
              color: "#bec6f2",
              border: "1px solid #31365e",
              borderRadius: "0",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
