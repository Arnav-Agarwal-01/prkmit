import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MagnetLines } from "@/components/ui/magnet-lines";
import { BackgroundGrid } from "@/components/BackgroundGrid";

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
        <BackgroundGrid color="rgb(237, 107, 32)" maxOpacity={0.7} squareSize={1.8} gridGap={10} flickerChance={0.3}>
          {children}
        </BackgroundGrid>
      </body>
    </html>
  );
}
