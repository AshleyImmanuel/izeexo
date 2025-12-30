"use client";

import { useRef } from "react";
import styles from "./page.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Text - Cinematic Blur Reveal
        tl.from(".hero_word", {
            y: 100,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out"
        });

        // Hero Description
        tl.from(`.${styles.description}`, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=1");

        // Narrative Section Scroll Trigger
        gsap.from("p.narrative_text", {
            scrollTrigger: {
                trigger: ".narrative_section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });

        // Stats Counter Animation
        gsap.from(".stat_value", {
            scrollTrigger: {
                trigger: ".stats_section",
                start: "top 80%"
            },
            textContent: 0,
            duration: 2,
            ease: "power1.out",
            snap: { textContent: 1 },
            stagger: 0.2
        });

        // Values Cards
        gsap.from(".value_card", {
            scrollTrigger: {
                trigger: ".values_section",
                start: "top 75%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });

    }, { scope: containerRef });

    const stats = [
        { label: "Years of Excellence", value: 5 },
        { label: "Successful Projects", value: 120 },
        { label: "Awards Won", value: 15 },
        { label: "Global Partners", value: 40 }
    ];

    const values = [
        { title: "Precision", desc: "Every pixel serves a purpose. We believe in the power of refined, intentional design.", number: "01" },
        { title: "Innovation", desc: "Pushing the boundaries of what is possible in web and fashion technology.", number: "02" },
        { title: "Elegance", desc: "Creating experiences that feel luxurious, timeless, and effortlessly sophisticated.", number: "03" }
    ];

    // Helper to wrap words for animation
    const Word = ({ children, className = "" }) => (
        <span className={`hero_word ${className}`} style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}>
            {children}
        </span>
    );

    return (
        <main className={styles.main} ref={containerRef}>
            <div className={styles.container}>

                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.label}>Who We Are</span>
                        <div className={styles.title}>
                            <Word>CRAFTING</Word>
                            <span className={styles.highlight} style={{ display: 'inline-block' }}>
                                <Word>DIGITAL</Word>
                            </span>
                            <Word>MASTERPIECES</Word>
                        </div>
                        <p className={styles.description}>
                            Izeexo is a boutique design studio at the intersection of technology and artistry.
                            We build brands that demand attention.
                        </p>
                    </div>
                </section>

                {/* Narrative */}
                <section className={`${styles.narrative} narrative_section`}>
                    <div className={styles.narrativeGrid}>
                        <div className={styles.sectionTitle}>Our Story</div>
                        <div className={styles.narrativeText}>
                            <p className="narrative_text">
                                We started with a simple belief: <strong>Design differentiates.</strong> In a crowded digital landscape,
                                mediocrity is invisible.
                            </p>
                            <p className="narrative_text">
                                From bespoke web applications to avant-garde fashion concepts, our work is defined by a
                                relentless pursuit of perfection. We don't just build websites; we create immersive ecosystems
                                that tell your brand's unique story.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className={`${styles.stats} stats_section`}>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <div key={i} className={styles.statItem}>
                                <span className={`${styles.statValue} stat_value`}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values */}
                <section className={`${styles.values} values_section`}>
                    <div className={styles.sectionTitle} style={{ marginBottom: '2rem' }}>Our Philosophy</div>
                    <div className={styles.valuesGrid}>
                        {values.map((item, i) => (
                            <div key={i} className={`${styles.valueCard} value_card`}>
                                <span className={styles.valueNumber}>{item.number}</span>
                                <h3 className={styles.valueTitle}>{item.title}</h3>
                                <p className={styles.valueDesc}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
