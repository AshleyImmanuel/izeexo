"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './BrandMarquee.module.css';

const brands = [
    "CHANEL", "NIKE", "LV", "OFF-WHITE", "GUCCI",
    "PRADA", "DIOR", "YSL", "BURBERRY", "FENDI"
];

export default function BrandMarquee() {
    const marqueeRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Clone content for seamless loop
        const content = track.innerHTML;
        track.innerHTML = content + content;

        // Animation
        const width = track.scrollWidth / 2;

        gsap.to(track, {
            x: -width,
            duration: 25,
            ease: "none",
            repeat: -1
        });
    }, []);

    return (
        <section className={styles.marqueeSection}>
            <p className={styles.label}>Design Language Inspired By</p>
            <div className={styles.marqueeContainer} ref={marqueeRef}>
                <div className={styles.track} ref={trackRef}>
                    {brands.map((brand, i) => (
                        <span key={i} className={styles.brandItem}>
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
