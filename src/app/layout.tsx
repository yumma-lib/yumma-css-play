import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Yumma CSS Play",
  description: "Yumma CSS Play based on Sandpack.",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
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
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msvalidate.01" content="AF8A1080D3AA38E031467BB3C0186136" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
