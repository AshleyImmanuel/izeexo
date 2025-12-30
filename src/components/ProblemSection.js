"use client";

import styles from "./ProblemSection.module.css";
// Animations removed as requested ("no animation or any cool stuff")

export default function ProblemSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.centerContent}>
                    <h2 className={styles.title}>
                        Bad Design Kills <br /> Fashion Labels.
                    </h2>
                    <p className={styles.subtitle}>
                        Your clothing needs a story. Don't let a weak identity ruin your collection.
                    </p>
                </div>

                {/* Floating Cards - Static now */}
                {/* 1 */}
                <div className={`${styles.floatingCard} ${styles.pos1}`}>
                    <div className={styles.iconWarning}>!</div>
                    <p>Generic logos don't build hype.</p>
                </div>

                {/* 2 */}
                <div className={`${styles.floatingCard} ${styles.pos2}`}>
                    <div className={styles.iconWarning}>!</div>
                    <p>Inconsistent style confuses buyers.</p>
                </div>

                {/* 3 */}
                <div className={`${styles.floatingCard} ${styles.pos3}`}>
                    <div className={styles.iconWarning}>!</div>
                    <p>Low-quality visuals cheapen the fabric.</p>
                </div>

                {/* 4 */}
                <div className={`${styles.floatingCard} ${styles.pos4}`}>
                    <div className={styles.iconWarning}>!</div>
                    <p>Bad websites kill impulse buys.</p>
                </div>
            </div>
        </section>
    );
}
