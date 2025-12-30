```javascript
"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const blueRef = useRef(null);
    const pinkRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
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

        // Initial setup
        gsap.set([text1Ref.current, text2Ref.current], { y: 100, opacity: 0 });
        gsap.set([logoWrapperRef.current, brandTitleRef.current, brandTagRef.current], { opacity: 0, y: 30 });
        
        // Split text for stagger (simple char split)
        // Ensure brandTitleRef.current exists before trying to access its properties
        if (brandTitleRef.current) {
            const chars = brandTitleRef.current.innerText.split("");
            brandTitleRef.current.innerHTML = chars.map(c => `< span class="char" > ${ c }</span > `).join("");
            // Set initial state for individual characters
            gsap.set(brandTitleRef.current.querySelectorAll(".char"), { y: 30, opacity: 0 });
        }


        tl
        // --- STEP 1: BLUE LAYER ---
        .to(text1Ref.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .to(text1Ref.current, { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.2")
        .to(blueRef.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" })

        // --- STEP 2: PINK LAYER ---
        .to(text2Ref.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .to(text2Ref.current, { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.2")
        .to(pinkRef.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" })

        // --- STEP 3: BLACK LAYER (FINAL) ---
        // Logo Scale & Fade
        .to(logoWrapperRef.current, { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            ease: "back.out(1.7)" 
        }, "-=0.3")
        // Title Staggered
        .to(brandTitleRef.current.querySelectorAll(".char"), { // Target the individual chars
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.5")
        // Tagline Fade
        .to(brandTagRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")

        .to({}, { duration: 0.8 }) // Hold

        // --- REVEAL: CURTAIN SPLIT ---
        .to([logoWrapperRef.current, brandTitleRef.current.querySelectorAll(".char"), brandTagRef.current], {
            opacity: 0,
            scale: 0.9,
            duration: 0.4
        })
        .to(leftPanelRef.current, { xPercent: -100, duration: 1.2, ease: "power3.inOut" }, "split")
        .to(rightPanelRef.current, { xPercent: 100, duration: 1.2, ease: "power3.inOut" }, "split");

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            
            {/* BLACK SPLIT LAYER (Bottom) */}
            <div className={`${ styles.layer } ${ styles.splitLayer } `}>
                <div className={styles.panel} ref={leftPanelRef}></div>
                <div className={styles.panel} ref={rightPanelRef}></div>
                
                {/* Content on top of panels */}
                <div className={styles.centerContent}>
                    <div className={styles.logoWrapper} ref={logoWrapperRef}>
                        <Image src="/logo.jpg" alt="Izeexo" width={180} height={180} className={styles.logo} priority />
                    </div>
                    <h1 className={styles.brandTitle} ref={brandTitleRef}>IZEEXO</h1>
                    <p className={styles.brandTag} ref={brandTagRef}>VISUALIZING THE EXTRAORDINARY</p>
                </div>
            </div>

            {/* PINK LAYER (Middle) */}
            <div className={`${ styles.layer } ${ styles.pink } `} ref={pinkRef}>
                <h2 className={styles.bigText} ref={text2Ref}>ELEGANCE</h2>
            </div>
            
            {/* BLUE LAYER (Top) */}
            <div className={`${ styles.layer } ${ styles.blue } `} ref={blueRef}>
                <h2 className={styles.bigText} ref={text1Ref}>DESIGN</h2>
            </div>

        </div>
    );
}
