// import Navigation from "@/components/navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Job Cold Email Generator",
  description:
    "Craft personalized, compelling cold emails for your dream job in seconds. Increase your chances of landing interviews with AI-powered email generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navigation /> */}
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
