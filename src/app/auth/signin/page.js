"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import styles from "./page.module.css";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);

    // Refs for animation
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const contentRef = useRef(null);
    const formRef = useRef(null);

    // Removed GSAP animation for better performance - using CSS transitions instead

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const handleGoogleSignIn = async () => {
        setIsLoading(true);

        // Animate out the panels
        gsap.to([leftPanelRef.current, rightPanelRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in"
        });

        // Wait for animation then sign in
        setTimeout(async () => {
            await signIn("google", { callbackUrl });
        }, 400);
    };

    return (
        <div ref={containerRef} className={styles.main}>

            {/* Left Panel - Brand / Dark Side */}
            <div ref={leftPanelRef} className={styles.leftPanel}>
                {/* Top Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 10 }}>
                    <Image src="/logo.jpg" alt="Izeexo" width={40} height={40} style={{ borderRadius: '50%' }} />
                    <span className={styles.brandName}>Izeexo</span>
                </div>

                {/* Center Content */}
                <div ref={contentRef} style={{ maxWidth: '480px', position: 'relative', zIndex: 10 }}>
                    <h1 className={styles.heading}>
                        Build Faster.<br />
                        <span className={styles.accent}>Scale Harder.</span>
                    </h1>
                    <p className={styles.subheading}>
                        The premium operating system for high-performance design engineering teams and future-ready brands.
                    </p>

                    <div className={styles.featureBadge}>
                        <span style={{ color: '#4ADE80' }}>✓</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Secure Enterprise Gateway</span>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    © {new Date().getFullYear()} Izeexo Design Studios.
                </div>
            </div>

            {/* Right Panel - Form / White Side */}
            <div ref={rightPanelRef} className={styles.rightPanel}>
                {/* Back Button */}
                <Link href="/" className={styles.backButton}>
                    ← Go Home
                </Link>

                <div ref={formRef} className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Welcome back</h2>
                    <p className={styles.formSubtitle}>Please sign in to access your dashboard.</p>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className={styles.googleBtn}
                    >
                        {!isLoading ? (
                            <span>Sign In with Google</span>
                        ) : (
                            <>
                                <div className={styles.spinner}></div>
                                <span>Connecting...</span>
                            </>
                        )}
                    </button>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                        By continuing, you agree to our Terms and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    );
}
