"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/auth.css";
import "@/styles/utilities.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

import { Toaster } from "react-hot-toast";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import PrivacyProtection from "@/components/PrivacyProtection";

function LayoutContent({ children }) {
  const pathname = usePathname();


  useEffect(() => {
    // Prevent right-click on images
    const handleContextmenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Prevent dragging images
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextmenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // Check global variable set by inline script to prevent flash
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.__INTRO_SHOWN__;
    }
    return true;
  });

  useEffect(() => {
    // Fallback: Check if intro has explicitly played in this session (double check)
    // AND check cookie in case inline script missed (unlikely but safe)
    if (typeof window !== 'undefined') {
      const hasSeenIntro = sessionStorage.getItem("intro_shown") || document.cookie.includes("intro_shown=true");
      if (hasSeenIntro) {
        setIsLoading(false);
      }
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("intro_shown", "true");
    document.cookie = "intro_shown=true; path=/; max-age=31536000"; // 1 year
  };

  const isAuthPage = pathname?.startsWith('/auth');
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const shouldShowNav = !isAuthPage && !isDashboardPage;

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {shouldShowNav && <Navbar />}
      <PrivacyProtection />
      {children}
      {shouldShowNav && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (document.cookie.includes('intro_shown=true')) {
                  window.__INTRO_SHOWN__ = true;
                }
              } catch (e) {}
            `,
          }}
        />
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
