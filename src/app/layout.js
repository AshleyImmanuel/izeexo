"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

import { Toaster } from "react-hot-toast";

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
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
