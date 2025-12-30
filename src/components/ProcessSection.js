"use client";

import styles from "./ProcessSection.module.css";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: "01",
        title: "Discover",
        desc: "We start by digging deep, understanding your goals, audience, and challenges. This is where insights surface.",
        color: "bg-red-500",
        shape: styles.shapeRed
    },
    {
        id: "02",
        title: "Plan",
        desc: "Next we map out a clear strategy, aligning AI solutions with your vision. Every step is designed to solve real problems.",
        color: "bg-blue-500",
        shape: styles.shapeBlue
    },
    {
        id: "03",
        title: "Build",
        desc: "Then we bring ideas to life, developing custom AI agents and automations. Each solution is crafted to fit seamlessly.",
        color: "bg-green-500",
        shape: styles.shapeGreen
    },
    {
        id: "04",
        title: "Scale",
        desc: "Finally we refine and expand, tracking results, improving performance, and scaling your AI systems as your business grows.",
        color: "bg-purple-500",
        shape: styles.shapePurple
    }
];

export default function ProcessSection() {
    const sectionRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);

    useGSAP(() => {
        const scrollContainer = sectionRef.current.querySelector(`.${styles.scrollContainer}`);

        ScrollTrigger.create({
            trigger: scrollContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                // Calculate which step should be active based on scroll progress
                const progress = self.progress;
                const stepIndex = Math.floor(progress * steps.length);
                const safeIndex = Math.min(stepIndex, steps.length - 1); // Clamp to max index
                setActiveStep(safeIndex);
            }
        });

    }, { scope: sectionRef });

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.StickyContainer}> {/* Wrapper to keep relative context */}
                <h2 className={styles.heading}>Our Process</h2>
            </div>

            <div className={styles.scrollContainer}>
                <div className={styles.stickyWrapper}>
                    <div className={styles.contentContainer}>
                        {/* Text Panel */}
                        <div className={styles.textPanel}>
                            {steps.map((step, index) => (
                                <div
                                    key={`text-${step.id}`}
                                    className={`${styles.stepText} ${activeStep === index ? styles.active : ''}`}
                                >
                                    <span className={styles.stepNumber}>/{step.id}</span>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Visual Panel */}
                        <div className={styles.visualPanel}>
                            {steps.map((step, index) => (
                                <div
                                    key={`visual-${step.id}`}
                                    className={`${styles.visualCard} ${activeStep === index ? styles.active : ''}`}
                                >
                                    {/* Placeholder 3D Shape */}
                                    <div className={`${styles.shape} ${step.shape}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
