"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                // Optional: remove from DOM or hide
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // 1. Fade In & Scale Up Logo
        tl.to(logoRef.current, {
            opacity: 1,
            scale: 1.2,
            duration: 1.2,
            ease: "power2.out"
        })
            // 2. Pulse Effect
            .to(logoRef.current, {
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            })
            // 3. Split/Fade Out Screen
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut"
            }, "+=0.3");

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            <div className={styles.logoWrapper} ref={logoRef}>
                {/* Visualizing the Extraordinary - Using the requested Logo */}
                <Image
                    src="/logo.jpg"
                    alt="Izeexo Preloader"
                    width={100}
                    height={100}
                    priority
                    className={styles.logo}
                />
            </div>
        </div>
    );
}
