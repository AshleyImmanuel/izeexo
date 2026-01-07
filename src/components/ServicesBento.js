"use client";

import styles from "./ServicesBento.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Icons removed - using abstract text/shapes

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
                <h2 className={styles.title}>What We Create</h2>
                <p className={styles.subtitle}>Tailored design services for fashion & lifestyle brands.</p>
            </div>

            <div className={styles.grid}>
                {/* 1. Brand Identity */}
                <div className={`${styles.card} ${styles.large}`}>
                    <div className={styles.content}>
                        <div className={styles.icon}>01</div>
                        <h3 className={styles.cardTitle}>Brand Identity & Logos</h3>
                        <p className={styles.cardDesc}>
                            We craft iconic logos and visual systems that define your label.
                            From tags to typography, we ensure your brand stops the scroll.
                        </p>
                    </div>
                    <div className={styles.graphic} />
                </div>

                {/* 2. Apparel */}
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.icon}>02</div>
                        <h3 className={styles.cardTitle}>Collection Design</h3>
                        <p className={styles.cardDesc}>
                            Full cut-and-sew development. From initial moodboards to production-ready technical packs.
                        </p>
                    </div>
                    <div className={styles.graphic} style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)' }} />
                </div>

                {/* 3. Merch */}
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.icon}>03</div>
                        <h3 className={styles.cardTitle}>Custom Merch</h3>
                        <p className={styles.cardDesc}>
                            High-quality streetwear and merchandise design that builds community.
                        </p>
                    </div>
                    <div className={styles.graphic} />
                </div>

                {/* 4. Storefronts */}
                <div className={`${styles.card} ${styles.large}`}>
                    <div className={styles.content}>
                        <div className={styles.icon}>04</div>
                        <h3 className={styles.cardTitle}>Digital Flagships</h3>
                        <p className={styles.cardDesc}>
                            Immersive brand experiences. We build online stores that feel like a physical showroom, tailored for drops.
                        </p>
                    </div>
                    <div className={styles.graphic} style={{ left: 'auto', right: '-5%', bottom: '-40%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }} />
                </div>
            </div>
        </section>
    );
}
