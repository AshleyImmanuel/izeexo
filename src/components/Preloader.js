"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const blueRef = useRef(null);
    const pinkRef = useRef(null);
    const finalRef = useRef(null);

    // Text Refs
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const logoWrapperRef = useRef(null);
    const brandTitleRef = useRef(null);
    const brandTagRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // Initial setup - Force content visibility
        gsap.set([text1Ref.current, text2Ref.current], { y: 80, opacity: 0 });
        gsap.set([logoWrapperRef.current, brandTagRef.current], { opacity: 0, y: 30 });

        // Character Split for Title
        if (brandTitleRef.current) {
            const text = brandTitleRef.current.innerText;
            const chars = text.split("");
            brandTitleRef.current.innerHTML = chars
                .map(c => `<span class="char" style="display:inline-block; opacity:0; transform:translateY(30px);">${c}</span>`)
                .join("");
        }

        tl
            // --- STEP 1: BLUE LAYER (DESIGN) ---
            .to(text1Ref.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
            .to(text1Ref.current, { y: -50, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.2")
            // Exit
            .to(blueRef.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" })

            // --- STEP 2: PINK LAYER (ELEGANCE) ---
            .to(text2Ref.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
            .to(text2Ref.current, { y: -50, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.2")
            // Exit
            .to(pinkRef.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" })

            // --- STEP 3: WHITE LAYER (IZEEXO) ---
            .to(logoWrapperRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.3")
            .to(brandTitleRef.current.querySelectorAll(".char"), {
                y: 0,
                opacity: 1,
                stagger: 0.04,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.6")
            .to(brandTagRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")

            .to({}, { duration: 0.5 }) // Hold

            // --- FINAL REVEAL ---
            .to([logoWrapperRef.current, brandTitleRef.current, brandTagRef.current], {
                scale: 1.5,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            })
            .to(finalRef.current, {
                opacity: 0,
                duration: 0.5
            }, "-=0.1");

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>

            {/* WHITE LAYER (Bottom/Final) */}
            <div className={`${styles.layer} ${styles.white}`} ref={finalRef}>
                <div className={styles.centerContent}>
                    <div className={styles.logoWrapper} ref={logoWrapperRef}>
                        <Image src="/logo.jpg" alt="Izeexo" width={180} height={180} className={styles.logo} priority />
                    </div>
                    {/* suppressHydrationWarning to safe-guard char split */}
                    <h1 className={styles.brandTitle} ref={brandTitleRef} suppressHydrationWarning>IZEEXO</h1>
                    <p className={styles.brandTag} ref={brandTagRef}>VISUALIZING THE EXTRAORDINARY</p>
                </div>
            </div>

            {/* PINK LAYER (Middle) */}
            <div className={`${styles.layer} ${styles.pink}`} ref={pinkRef}>
                <h2 className={styles.bigText} ref={text2Ref}>ELEGANCE</h2>
            </div>

            {/* BLUE LAYER (Top) */}
            <div className={`${styles.layer} ${styles.blue}`} ref={blueRef}>
                <h2 className={styles.bigText} ref={text1Ref}>DESIGN</h2>
            </div>

        </div>
    );
}
