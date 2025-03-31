import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundSparkles } from "@/components/BackgroundSparkles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PR KMIT",
  description: "Website for PR KMIT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundSparkles>
        {children}
        </BackgroundSparkles>
      </body>
    </html>
  );
}
