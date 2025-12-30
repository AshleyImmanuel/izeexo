"use client";

import styles from "./ProblemSection.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.floatingCard}`);

        cards.forEach((card, i) => {
            gsap.to(card, {
                y: i % 2 === 0 ? -50 : 50, // Move visually in different directions
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.centerContent}>
                    <h2 className={styles.title}>
                        Eliminate the bottlenecks <br /> that hold you back.
                    </h2>
                    <p className={styles.subtitle}>
                        Outdated workflows and generic designs are costing you clients.
                    </p>
                </div>

                {/* Floating Cards - "Problems" */}
                {/* 1 */}
                <div className={`${styles.floatingCard} ${styles.pos1}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Teams spend too much time on repetitive tasks.</p>
                </div>

                {/* 2 */}
                <div className={`${styles.floatingCard} ${styles.pos2}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Leads slip away without consistent follow-up.</p>
                </div>

                {/* 3 */}
                <div className={`${styles.floatingCard} ${styles.pos3}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Outdated workflows hurt customer experience.</p>
                </div>

                {/* 4 */}
                <div className={`${styles.floatingCard} ${styles.pos4}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Scaling requires more people and higher costs.</p>
                </div>
            </div>
        </section>
    );
}
