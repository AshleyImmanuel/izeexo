"use client";

import { useRef } from "react";
import styles from "./page.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from 'next/link';
import { FiPenTool, FiLayers, FiMonitor, FiBox, FiArrowRight } from 'react-icons/fi';
import BrandMarquee from "@/components/about/BrandMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Text - Clean Reveal
        tl.from(".hero_word", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });

        tl.from(`.${styles.description}`, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

        // Bento Grid Reveal - Robust Animation
        gsap.fromTo(".bento_card",
            { y: 50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: ".create_section",
                    start: "top 95%" // Trigger earlier
                },
                y: 0,
                autoAlpha: 1, // Ensures visibility
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            }
        );

        // Split Section Reveal
        gsap.fromTo(".split_card",
            { y: 50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: ".split_section",
                    start: "top 90%"
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out"
            }
        );

        // Narrative Reveal
        gsap.fromTo(".narrative_text",
            { y: 30, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: ".narrative_section",
                    start: "top 90%"
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: "power2.out"
            }
        );

    }, { scope: containerRef });

    const createItems = [
        { icon: <FiPenTool />, title: "Brand Identity", desc: "Logos, visual systems, and brand guidelines that define who you are.", link: "/contact" },
        { icon: <FiLayers />, title: "Collection Design", desc: "Tech packs, pattern making, and apparel concept development.", link: "/store" },
        { icon: <FiMonitor />, title: "Digital Lookbooks", desc: "High-performance digital showcases for your collections.", link: "/contact" },
        { icon: <FiBox />, title: "Creative Assets", desc: "3D renders, mockups, and graphic elements ready to use.", link: "/store" }
    ];

    const Word = ({ children, className = "" }) => (
        <span className={`hero_word ${className}`} style={{ display: 'inline-block' }}>
            {children}
        </span>
    );

    return (
        <main className={styles.main} ref={containerRef}>
            <div className={styles.container}>

                {/* Hero */}
                <section className={styles.hero}>
                    <span className={styles.label}>Who We Are</span>
                    <div className={styles.title}>
                        <Word>CRAFTING</Word>
                        <span className={styles.highlight} style={{ display: 'inline-block' }}>
                            <Word>BRAND</Word>
                        </span>
                        <Word>LEGACIES</Word>
                    </div>
                    <p className={styles.description}>
                        Izeexo is a premium design studio. We bridge the gap between
                        artistic vision and commercial reality.
                    </p>
                </section>

                {/* Brand Marquee */}
                <BrandMarquee />

                {/* What We Create - Bento Grid */}
                <section className={`${styles.section} create_section`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>What We Create</h2>
                        <p className={styles.sectionSubtitle}>Comprehensive design solutions for modern brands.</p>
                    </div>
                    <div className={styles.bentoGrid}>
                        {createItems.map((item, i) => (
                            <div key={i} className={`${styles.bentoCard} bento_card`}>
                                <div>
                                    <div className={styles.cardIcon}>{item.icon}</div>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <p className={styles.cardDesc}>{item.desc}</p>
                                </div>
                                <Link href={item.link} className={styles.cardLink}>
                                    View Examples <FiArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Model - Split Section */}
                <section className={`${styles.section} split_section`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Choose Your Path</h2>
                        <p className={styles.sectionSubtitle}>Two ways to elevate your brand with Izeexo.</p>
                    </div>
                    <div className={styles.splitGrid}>
                        {/* Custom Work */}
                        <div className={`${styles.splitCard} ${styles.custom} split_card`}>
                            <span className={styles.splitTag}>The Bespoke Route</span>
                            <h3 className={styles.splitTitle}>Tailored Vision</h3>
                            <p className={styles.splitDesc}>
                                For those who need a unique identity. We work closely with you to build
                                a brand language from the ground up.
                            </p>
                            <Link href="/contact" className={styles.splitBtn}>Get Started</Link>
                            <div className={styles.splitImage}><FiPenTool /></div>
                        </div>

                        {/* Store */}
                        <div className={`${styles.splitCard} ${styles.store} split_card`}>
                            <span className={styles.splitTag}>The Instant Route</span>
                            <h3 className={styles.splitTitle}>Marketplace</h3>
                            <p className={styles.splitDesc}>
                                High-quality, pre-built assets and templates. Download professional
                                resources and start creating immediately.
                            </p>
                            <Link href="/store" className={styles.splitBtn}>Browse Store</Link>
                            <div className={styles.splitImage}><FiBox /></div>
                        </div>
                    </div>
                </section>

                {/* Narrative / Purpose */}
                <section className={`${styles.narrative} narrative_section`}>
                    <p className={`${styles.narrativeText} narrative_text`}>
                        &quot;We don&apos;t just make things look good. We build systems that work.
                        Whether it&apos;s a <span className={styles.narrativeHighlight}>custom logo</span> or a
                        <span className={styles.narrativeHighlight}> premium fashion collection</span>, our goal is the same:
                        to empower your creative potential.&quot;
                    </p>

                    {/* Stats Grid to fill space */}
                    <div className={styles.statsRow}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Premium Assets</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>24/7</span>
                            <span className={styles.statLabel}>Dedicated Support</span>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
