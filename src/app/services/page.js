"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Reveal Header
        tl.from(`.${styles.title}`, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(`.${styles.subtitle}`, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

        // Reveal Form Elements Staggered
        gsap.from(".form_group_anim", {
            scrollTrigger: {
                trigger: `.${styles.form}`,
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });

    }, { scope: containerRef });

    const [formData, setFormData] = useState({
        designType: "Logo Design",
        description: "",
        budget: "",
        deadline: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call would go here
        alert("Request submitted! We will contact you shortly.");
    };

    return (
        <main className={styles.main} ref={containerRef}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Custom Design Services</h1>
                <p className={styles.subtitle}>
                    Tell us about your project, and we'll bring it to life.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={`${styles.formGroup} form_group_anim`}>
                        <label htmlFor="designType">Design Type</label>
                        <select
                            name="designType"
                            id="designType"
                            value={formData.designType}
                            onChange={handleChange}
                        >
                            <option>Logo Design</option>
                            <option>Fashion / Costume Design</option>
                            <option>Branding Package</option>
                            <option>Illustration</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className={`${styles.formGroup} form_group_anim`}>
                        <label htmlFor="description">Project Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows="5"
                            placeholder="Describe your vision, requirements, and style preferences..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className={styles.row}>
                        <div className={`${styles.formGroup} form_group_anim`}>
                            <label htmlFor="budget">Budget (INR)</label>
                            <input
                                type="text"
                                name="budget"
                                id="budget"
                                placeholder="e.g. ₹10,000 - ₹50,000"
                                value={formData.budget}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={`${styles.formGroup} form_group_anim`}>
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                id="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={`${styles.formGroup} form_group_anim`}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={`${styles.formGroup} form_group_anim`}>
                        <label>Reference Files (Optional)</label>
                        <div className={styles.fileUpload}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <span>Click to upload images or docs</span>
                            {/* File input would be handled here, potentially with Cloudinary */}
                            <input type="file" className={styles.hiddenInput} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary form_group_anim">
                        Submit Request
                    </button>
                </form>
            </div>
        </main>
    );
}
