"use client";

import styles from "@/app/about/page.module.css";

export default function VisionSection() {
    return (
        <section className={styles.visionSection}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.visionText}>
                "To redefine the intersection of identity and fashion, creating brand experiences that feel as tangible and luxurious as a couture garment."
            </p>
        </section>
    );
}
