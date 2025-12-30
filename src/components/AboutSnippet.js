"use client";

import styles from "./AboutSnippet.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSnippet() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(`.${styles.title}`, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(`.${styles.description}`, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(`.${styles.statBox}`, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            }, "-=0.4");

    }, { scope: sectionRef });

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className="container">
                <div className={styles.content}>
                    <h2 className={styles.title}>We Design for the Future</h2>
                    <p className={styles.description}>
                        Izeexo is a boutique design studio specializing in visual identity and
                        creative aesthetics. We believe in the power of minimalism and elegance.
                        From bespoke logos to exclusive costume and dress designs, we bring
                        your artistic vision to life with precision and style.
                    </p>
                    <div className={styles.stats}>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>5+</span>
                            <span className={styles.statLabel}>Years Experience</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
