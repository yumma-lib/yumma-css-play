import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

import "../styles/globals.css";

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
      <head>
        <link rel="apple-touch-icon" href="/apple-touch.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Yumma CSS" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
