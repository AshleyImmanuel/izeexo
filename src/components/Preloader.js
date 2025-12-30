"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const logoRef = useRef(null);
    const lineRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // Initial State
        gsap.set(lineRef.current, { height: 0 });
        gsap.set(textRef.current, { opacity: 0, letterSpacing: "1em" });

        tl
            // 1. Logo Fades In
            .fromTo(logoRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
            )
            // 2. Center Line Draws (Top to Bottom)
            .to(lineRef.current, {
                height: "100vh",
                duration: 1,
                ease: "expo.inOut"
            }, "-=0.5")
            // 3. Text Reveals (Condensing)
            .to(textRef.current, {
                opacity: 1,
                letterSpacing: "0.2em",
                duration: 1,
                ease: "power3.out"
            }, "-=0.5")

            // 4. Pause
            .to({}, { duration: 0.5 })

            // 5. THE SPLIT (Open Doors)
            .to([logoRef.current, textRef.current, lineRef.current], {
                opacity: 0,
                duration: 0.3
            })
            .to(leftPanelRef.current, {
                xPercent: -100,
                duration: 1.2,
                ease: "power3.inOut"
            }, "split")
            .to(rightPanelRef.current, {
                xPercent: 100,
                duration: 1.2,
                ease: "power3.inOut"
            }, "split");

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            <div className={styles.panel} ref={leftPanelRef} style={{ left: 0 }}></div>
            <div className={styles.panel} ref={rightPanelRef} style={{ right: 0 }}></div>

            <div className={styles.centerLine} ref={lineRef}></div>

            <div className={styles.content}>
                <div className={styles.logoWrapper} ref={logoRef}>
                    <Image
                        src="/logo.jpg"
                        alt="Izeexo Logo"
                        width={140}
                        height={140}
                        priority
                        className={styles.logo}
                    />
                </div>
                <h2 className={styles.brandName} ref={textRef}>IZEEXO</h2>
            </div>
        </div>
    );
}
