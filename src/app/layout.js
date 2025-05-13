import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MagnetLines } from "@/components/ui/magnet-lines";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Footer } from "@/components/ui/footer";
import { Analytics } from "@vercel/analytics/next";

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
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16",
        type: "image/ico"
      },
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/ico"
      },
      {
        url: "/favicon.ico", 
        sizes: "48x48",
        type: "image/ico"
      }
    ],
  },
};

export default function RootLayout({ children }) {
  // Define navigation items for the navbar
  const navItems = [
    { name: "Home", url: "/", icon: "home" },
    { name: "Events and Sponsorships", url: "/events", icon: "calendar" },
    { name: "About", url: "/about", icon: "info" },
    { name: "Contact", url: "/contact", icon: "mail" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundGrid color="rgb(237, 107, 32)" maxOpacity={0.7} squareSize={1.8} gridGap={10} flickerChance={0.3}>
          <NavBar items={navItems} />
          {children}
          <Footer />
        </BackgroundGrid>
        <Analytics/>
      </body>
    </html>
  );
}
