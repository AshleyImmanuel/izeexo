"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // Initial States
        gsap.set(contentRef.current, { perspective: 800 });
        gsap.set([logoRef.current, titleRef.current], {
            z: 0,
            rotationX: 0,
            rotationY: 0,
            opacity: 0,
            y: 50
        });

        tl
            // 1. Entering (Cinematic Float Up)
            .to([logoRef.current, titleRef.current], {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: "power3.out"
            })
            // 2. 3D Tilt / Float
            .to([logoRef.current, titleRef.current], {
                rotationX: 10,
                z: 50,
                duration: 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: 1
            }, "-=1.0")

            // 3. Anticipation (Shrink slightly)
            .to(containerRef.current, {
                scale: 0.95,
                duration: 0.5,
                ease: "power2.in"
            })

            // 4. THE PORTAL ZOOM (Fly through)
            .to(containerRef.current, {
                scale: 50,
                opacity: 0,
                duration: 0.8,
                ease: "expo.in",
                pointerEvents: "none"
            });

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            <div className={styles.innerContent} ref={contentRef}>
                <div className={styles.logoWrapper} ref={logoRef}>
                    <Image
                        src="/logo.jpg"
                        alt="Izeexo Logo"
                        width={150}
                        height={150}
                        priority
                        className={styles.logo}
                    />
                </div>
                <h1 className={styles.title} ref={titleRef}>
                    IZEEXO
                    <span className={styles.tagline}>DESIGN STUDIO</span>
                </h1>
            </div>
        </div>
    );
}
