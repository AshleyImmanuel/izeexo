"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Reveal Badge
        tl.from(`.${styles.badge}`, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Reveal Title Words (staggered block reveal)
        tl.from(".hero_title_row", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out"
        }, "-=0.4");

        // Reveal Subtitle
        tl.from(`.${styles.subtitle}`, {
            x: -20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.8");

        // Reveal Actions
        tl.from(`.${styles.buttonGroup}`, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6");

        // Reveal Background
        tl.from(`.${styles.bgCircle}`, {
            scale: 0.8,
            opacity: 0,
            duration: 2,
            ease: "power2.out"
        }, "-=1.5");

    }, { scope: containerRef });

    // Helper for title rows
    const TitleWord = ({ children, highlight = false }) => (
        <span className={highlight ? styles.highlight : ''}>
            {children}
        </span>
    );

    return (
        <section className={styles.hero} ref={containerRef}>
            <div className={styles.content}>
                <span className={styles.badge}>Premium Design Studio</span>
                <h1 className={styles.title}>
                    {/* Block layout for editorial impact */}
                    <div className="hero_title_row">ELEVATE</div>
                    <div className="hero_title_row">YOUR BRAND</div>
                    <div className="hero_title_row">
                        with <span className={styles.highlight}>Elegant Design</span>
                    </div>
                </h1>
                <p className={styles.subtitle}>
                    We craft stunning visuals, logos, and websites that leave a lasting impression.
                    Tailored to your unique vision.
                </p>

                <div className={styles.buttonGroup}>
                    <Link href="/store" className={styles.primaryButton}>
                        Explore Store
                    </Link>
                    <Link href="/about" className={styles.secondaryButton}>
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Decorative Background Element */}
            <div className={styles.bgCircle} />
        </section>
    );
}
