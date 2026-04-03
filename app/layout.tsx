import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

import FloatingActions from "@/components/FloatingActions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KK Hospitalities | Premium Co-Living Rental Platform",
  description: "Premium co-living rentals for modern professionals in Hyderabad. Fully-furnished rooms near HITEC City, Gachibowli, and Madhapur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
