import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "@/styles/out.css";

export const metadata: Metadata = {
  title: "Yumma CSS Play",
  description: "Yumma CSS Play based on Sandpack.",
  icons: {
    apple: "/apple-touch.png",
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Yumma CSS Play",
    description: "Yumma CSS Play based on Sandpack.",
    siteName: "Yumma CSS Play",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#151724;" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
