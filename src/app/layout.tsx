import { Inter } from "next/font/google";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next";
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
      <body className={inter.className} style={{ backgroundColor: "#151724;"}}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
