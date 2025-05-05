import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal Blogging",
  description: "Personal blogging for tech stack sharing information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`w-full flex justify-center items-center ${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
