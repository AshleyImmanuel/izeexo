"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);

    // Refs for animation
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const contentRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial state
        gsap.set([leftPanelRef.current, rightPanelRef.current], { autoAlpha: 0 });
        gsap.set(contentRef.current.children, { y: 20, opacity: 0 });
        gsap.set(formRef.current.children, { y: 20, opacity: 0 });

        tl.to([leftPanelRef.current, rightPanelRef.current], {
            autoAlpha: 1,
            duration: 0.5
        })
            .to(contentRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8
            }, "-=0.2")
            .to(formRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8
            }, "-=0.6");

    }, []);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div ref={containerRef} style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100vw',
            overflow: 'hidden',
            fontFamily: 'inherit'
        }}>

            {/* Left Panel - Brand / Dark Side */}
            <div ref={leftPanelRef} style={{
                flex: '1',
                background: '#060010', // Brand Dark
                color: 'white',
                padding: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                opacity: 0 // handled by GSAP
            }}>
                {/* Top Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Image src="/logo.jpg" alt="Izeexo" width={50} height={50} style={{ borderRadius: '50%' }} priority />
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Izeexo</span>
                </div>

                {/* Center Content */}
                <div ref={contentRef} style={{ maxWidth: '480px' }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '24px',
                        letterSpacing: '-0.03em'
                    }}>
                        Build Faster.<br />
                        <span style={{ color: '#ff3b30' }}>Scale Harder.</span> {/* Brand Accent Color */}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.6',
                        fontWeight: '400'
                    }}>
                        The premium operating system for high-performance design engineering teams and future-ready brands.
                    </p>

                    <div style={{
                        marginTop: '40px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '100px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <span style={{ color: '#4ADE80' }}>✓</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Secure Enterprise Gateway</span>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ opacity: 0.5, fontSize: '0.875rem' }}>
                    © {new Date().getFullYear()} Izeexo Design Studios.
                </div>
            </div>

            {/* Right Panel - Form / White Side */}
            <div ref={rightPanelRef} style={{
                flex: '1',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px',
                position: 'relative',
                opacity: 0 // handled by GSAP
            }}>
                {/* Back Button */}
                <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        color: '#111',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        padding: '10px 20px',
                        borderRadius: '100px',
                        border: '1px solid #eee',
                        background: 'white',
                        transition: 'all 0.2s'
                    }}>
                        ← Go Home
                    </Link>
                </div>

                <div ref={formRef} style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '10px', color: '#111', letterSpacing: '-0.02em' }}>Welcome back</h2>
                    <p style={{ color: '#666', marginBottom: '40px', fontSize: '1rem' }}>Please sign in to access your dashboard.</p>

                    {/* Simulated Fields for visual match (Disabled/Static for now if sticking to Google only, or just clean button) */}
                    {/* The user wants "something like this" so let's just stick to the clean Google button as the "Main Action" 
                but style it big and bold like the "Sign In" button in the screenshot. */}

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            height: '56px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#060010', // Matched to brand dark
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: isLoading ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'transform 0.2s, opacity 0.2s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {!isLoading ? (
                            <>
                                <Image src="https://authjs.dev/img/providers/google.svg" alt="G" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                                {/* Inverted google logo for black button? Or keep original. Let's keep original for brand trust usually, but white icon looks sleeker on black. */}
                                <span>Sign In with Google</span>
                            </>
                        ) : (
                            <span>Connecting...</span>
                        )}
                    </button>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>Need an account? </span>
                        <Link href="/contact" style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}>Contact Admin</Link>
                    </div>
                </div>
            </div>

            {/* Mobile responsive adjustment css inline */}
            <style jsx global>{`
        @media (max-width: 960px) {
            div[style*="display: flex"][style*="min-height: 100vh"] {
                flex-direction: column;
            }
             /* Left panel adjustments */
            div[ref="leftPanelRef"] {
                padding: 40px !important;
                flex: none !important;
                height: auto !important;
                min-height: 400px;
            }
             /* Right panel adjustments */
            div[ref="rightPanelRef"] {
                padding: 40px !important;
                flex: 1 !important;
            }
        }
      `}</style>
        </div>
    );
}
