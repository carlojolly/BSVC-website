import type { Metadata } from "next";
import { Geist_Mono, Libre_Franklin, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { FixedAurora } from "@/components/ui/fixed-aurora";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreF = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["200", "300", "500", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BSVC — Bocconi Students for Venture Capital",
  description: "Creating a VC and startup ecosystem for Bocconi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${libreF.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <FixedAurora />
        <Header />
        {children}
      </body>
    </html>
  );
}
