"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";

export default function Provider({ children }) {
    const [loading, setLoading] = useState(true);

    // Safety timeout in case GSAP fails or takes too long
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) setLoading(false);
        }, 6000); // 6 seconds max
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <SessionProvider>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease" }}>
                {children}
            </div>
        </SessionProvider>
    );
}
