"use client";

import styles from "./ProblemSection.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Animate Header
        gsap.from(`.${styles.header}`, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: `.${styles.header}`,
                start: "top 85%",
            }
        });

        // Animate Grid Items
        gsap.from(`.${styles.card}`, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: `.${styles.grid}`,
                start: "top 80%",
            }
        });

    }, { scope: sectionRef });

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Bad Design Kills <br /> Fashion Labels.
                    </h2>
                    <p className={styles.subtitle}>
                        Your clothing needs a story. Don't let a weak identity ruin your collection.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Card 1 */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>!</div>
                        <div>
                            <h3 className={styles.cardTitle}>Generic Branding</h3>
                            <p className={styles.cardDesc}>Generic logos don't build hype or recognition.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>!</div>
                        <div>
                            <h3 className={styles.cardTitle}>Inconsistent Style</h3>
                            <p className={styles.cardDesc}>A disjointed look confuses buyers and dilutes impact.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>!</div>
                        <div>
                            <h3 className={styles.cardTitle}>Low Quality</h3>
                            <p className={styles.cardDesc}>Poor visuals cheapen the perceived value of your fabric.</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>!</div>
                        <div>
                            <h3 className={styles.cardTitle}>Bad UX</h3>
                            <p className={styles.cardDesc}>Clunky websites kill impulse buys instantly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
