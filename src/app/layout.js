import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MagnetLines } from "@/components/ui/magnet-lines";

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
        <div className="fixed inset-0 z-[-1]">
          <MagnetLines></MagnetLines>
        </div>
        {children}
      </body>
    </html>
  );
}
