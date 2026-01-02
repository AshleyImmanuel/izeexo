"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";

export default function Provider({ children }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Only show preloader once per session
        const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
        if (!hasSeenPreloader) {
            setLoading(true);
        }
    }, []);

    const handlePreloaderComplete = () => {
        setLoading(false);
        sessionStorage.setItem('hasSeenPreloader', 'true');
    };

    // Safety timeout in case GSAP fails or takes too long
    useEffect(() => {
        if (!loading) return;
        const timer = setTimeout(() => {
            handlePreloaderComplete();
        }, 6000); // 6 seconds max
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <SessionProvider>
            {loading && <Preloader onComplete={handlePreloaderComplete} />}
            <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease" }}>
                {children}
            </div>
        </SessionProvider>
    );
}
