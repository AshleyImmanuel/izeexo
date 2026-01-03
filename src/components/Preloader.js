"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const counterRef = useRef(null);
    const progressRef = useRef(null);
    const shutterRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // 1. Initial State (Avoid FOUC)
        gsap.set(containerRef.current, { autoAlpha: 1 }); // Ensure visible
        gsap.set(counterRef.current, { y: 100, opacity: 0 }); // Start hidden below

        // 2. Counter Entry
        tl.to(counterRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        })

            // 3. Count up (0 to 100)
            .to({}, {
                duration: 1.5,
                ease: "expo.inOut",
                onUpdate: function () {
                    // Simulate loading progress
                    const progress = Math.round(this.progress() * 100);
                    if (counterRef.current) {
                        counterRef.current.innerText = progress;
                    }
                    // Optional: Animate a progress bar width if we had one
                    if (progressRef.current) {
                        progressRef.current.style.width = `${progress}%`;
                    }
                }
            })

            // 4. Exit Animation (Shutter Effect)
            .to(counterRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            })
            .to(shutterRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut"
            }, "-=0.2"); // Overlap slightly

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            {/* Background Shutter */}
            <div className={styles.shutter} ref={shutterRef}></div>

            {/* Counter Number */}
            <div className={styles.counterContainer}>
                <span className={styles.counterText} ref={counterRef}>0</span>
                <span className={styles.counterText}>%</span>
            </div>

            {/* Progress Bar (Optional, simpler visual) */}
            <div className={styles.progressBar} ref={progressRef}></div>
        </div>
    );
}
