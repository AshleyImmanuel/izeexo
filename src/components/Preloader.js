"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

// Shuffle Text Component (Simplified inline for Preloader)
const ShuffleText = ({ text, trigger }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

    useEffect(() => {
        if (!trigger) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [trigger, text]);

    return <span>{display || text.split("").map(() => "0").join("")}</span>;
}

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const contentRef = useRef(null);
    const [startShuffle, setStartShuffle] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // 1. Line up shutters (handled in CSS/JSX)

        // 2. Animate Content In
        tl.to(logoRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
            .call(() => setStartShuffle(true)) // Start text shuffle
            .to(`.${styles.textWrapper}`, {
                opacity: 1,
                duration: 0.5
            }, "-=0.5")

            // 3. Pause for impact
            .to({}, { duration: 1.2 })

            // 4. Content Scales Out
            .to(contentRef.current, {
                scale: 1.5,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in"
            })

            // 5. Shutters Reveal (Staggered Slide Up)
            .to(`.${styles.shutter}`, {
                height: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut"
            });

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            {/* Shutters Overlay */}
            <div className={styles.shutterGrid}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={styles.shutter} />
                ))}
            </div>

            {/* Main Content (Above Shutters initially, but we want shutters to BE the background) 
                Wait, shutters should be the background that slides away. 
                So content z-index > shutters.
            */}
            <div className={styles.content} ref={contentRef}>
                <div className={styles.logoContainer}>
                    <Image
                        ref={logoRef}
                        src="/logo.jpg"
                        alt="Izeexo Output"
                        width={140}
                        height={140}
                        priority
                        className={styles.logo}
                    />
                </div>
                <div className={styles.textWrapper}>
                    <h1 className={styles.brandTitle}>
                        <ShuffleText text="IZEEXO" trigger={startShuffle} />
                    </h1>
                    <p className={styles.brandSubtitle}>VISUALIZING THE EXTRAORDINARY</p>
                </div>
            </div>
        </div>
    );
}
