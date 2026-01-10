"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import PrivacyProtection from "@/components/PrivacyProtection";
import { Toaster } from "react-hot-toast";
import Provider from "@/components/Provider";

export default function ClientLayout({ children }) {
    const pathname = usePathname();

    // Check global variable set by inline script to prevent flash
    const [isLoading, setIsLoading] = useState(() => {
        if (typeof window !== 'undefined') {
            const skipped = !!window.__INTRO_SHOWN__;
            return !skipped;
        }
        return true;
    });

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

    useEffect(() => {
        // Fallback logic
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
        <Provider>
            <Toaster position="bottom-center" toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }} />
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            {shouldShowNav && <Navbar />}
            <PrivacyProtection />
            {children}
            {shouldShowNav && <Footer />}
        </Provider>
    );
}
