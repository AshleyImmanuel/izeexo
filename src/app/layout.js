"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

import { Toaster } from "react-hot-toast";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";

function LayoutContent({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Check if intro has explicitly played in this session
  //   const hasSeenIntro = sessionStorage.getItem("intro_shown");
  //   if (hasSeenIntro) {
  //     setIsLoading(false);
  //   }
  // }, []); // Run once on mount

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("intro_shown", "true");
  };

  const isAuthPage = pathname?.startsWith('/auth');
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const shouldShowNav = !isAuthPage && !isDashboardPage;

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {shouldShowNav && <Navbar />}
      {children}
      {shouldShowNav && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Provider>
          <Toaster position="bottom-center" toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }} />
          <LayoutContent>{children}</LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
