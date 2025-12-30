"use client";

import styles from "./ServicesBento.module.css";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesBento() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.card}`);

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.heading}>
                <h2 className={styles.title}>Our Expertise</h2>
                <p className={styles.subtitle}>Comprehensive solutions for modern brands.</p>
            </div>

            <div className={styles.grid}>
                {/* 1. Large Feature - Strategy */}
                <div className={`${styles.card} ${styles.large}`}>
                    <div className={styles.content}>
                        <div className={styles.icon}>S</div>
                        <h3 className={styles.cardTitle}>Digital Strategy & SEO</h3>
                        <p className={styles.cardDesc}>
                            We build the roadmap to your success. From market analysis to SEO optimization,
                            we ensure your brand reaches the right audience at the right time.
                        </p>
                    </div>
                    <div className={styles.graphicCircle} />
                </div>

                {/* 2. Normal - UI/UX */}
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.icon} style={{ background: '#8b5cf6' }}>D</div>
                        <h3 className={styles.cardTitle}>UI/UX Design</h3>
                        <p className={styles.cardDesc}>
                            Crafting intuitive, beautiful interfaces that delight users and drive engagement.
                        </p>
                    </div>
                </div>

                {/* 3. Normal - Dev */}
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.icon}>C</div>
                        <h3 className={styles.cardTitle}>Development</h3>
                        <p className={styles.cardDesc}>
                            Robust, scalable code. We specialize in Next.js, React, and modern web technologies.
                        </p>
                    </div>
                </div>

                {/* 4. Large Feature - Growth */}
                <div className={`${styles.card} ${styles.large}`} style={{ gridColumn: 'span 2' }}> {/* Flip logic if needed for asymmetry */}
                    <div className={styles.content}>
                        <div className={styles.icon} style={{ background: '#000' }}>G</div>
                        <h3 className={styles.cardTitle}>Brand Growth</h3>
                        <p className={styles.cardDesc}>
                            Data-driven campaigns and creative direction to scale your business to new heights.
                        </p>
                    </div>
                    <div className={styles.graphicLine} style={{ width: '200px' }} />
                </div>
            </div>
        </section>
    );
}
