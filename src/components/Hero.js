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

        // Reveal Title Words
        tl.from(".hero_title_word", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.4");

        // Reveal Subtitle
        tl.from(`.${styles.subtitle}`, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6");

        // Reveal Actions
        tl.from(`.${styles.actions}`, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6");

        // Reveal Background Circle
        tl.from(`.${styles.bgCircle}`, {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1");

    }, { scope: containerRef });

    // Helper for title words to ensure they are wrapped for animation
    const TitleWord = ({ children, highlight = false }) => (
        <span className={`hero_title_word ${highlight ? styles.highlight : ''}`} style={{ display: 'inline-block', marginRight: '0.2em' }}>
            {children}
        </span>
    );

    return (
        <section className={styles.hero} ref={containerRef}>
            <div className={styles.content}>
                <span className={styles.badge}>Premium Design Studio</span>
                <h1 className={styles.title}>
                    <TitleWord>Elevate</TitleWord>
                    <TitleWord>Your</TitleWord>
                    <TitleWord>Brand</TitleWord>
                    <br />
                    <TitleWord>with</TitleWord>
                    <TitleWord highlight={true}>Elegant</TitleWord>
                    <TitleWord highlight={true}>Design</TitleWord>
                </h1>
                <p className={styles.subtitle}>
                    We craft stunning visuals, logos, and websites that leave a lasting impression.
                    Minimalist, professional, and tailored to your vision.
                </p>

                <div className={styles.actions}>
                    <Link href="/store" className="btn btn-primary">
                        Explore Store
                    </Link>
                    <Link href="/services" className="btn btn-outline">
                        Request Custom Design
                    </Link>
                </div>
            </div>

            {/* Decorative Background Element */}
            <div className={styles.bgCircle} />
        </section>
    );
}
