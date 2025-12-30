"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>

                {/* 1. MEGA CTA SECTION */}
                <div className={styles.ctaSection}>
                    <h2 className={styles.megaText}>
                        <span className={styles.outlineText}>LETS</span>
                        <span className={styles.filledText}>CREATE</span>
                    </h2>
                    <h2 className={styles.megaText}>
                        <span className={styles.filledText}>SOMETHING</span>
                        <span className={styles.outlineText}>REAL.</span>
                    </h2>

                    <Link href="/contact" className={styles.ctaButton}>
                        Start a Project <FaArrowRight className={styles.btnIcon} />
                    </Link>
                </div>

                <div className={styles.separator}></div>

                {/* 2. CONTENT GRID */}
                <div className={styles.contentGrid}>

                    {/* Brand Column */}
                    <div className={styles.brandColumn}>
                        <div className={styles.logoRow}>
                            {/* Assuming logo is available, using text for now if image not perfect size */}
                            <h3 className={styles.brandName}>IZEEXO.</h3>
                        </div>
                        <p className={styles.brandDesc}>
                            A premium design studio visualizing the extraordinary for forward-thinking brands.
                        </p>
                        <div className={styles.studioInfo}>
                            <p>EST. 2025</p>
                            <p>DESIGN STUDIO</p>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={styles.linksGroup}>
                        <div className={styles.linkCol}>
                            <h4>EXPLORE</h4>
                            <Link href="/">Home</Link>
                            <Link href="/store">Store</Link>
                            <Link href="/services">Services</Link>
                            <Link href="/about">About</Link>
                        </div>

                        <div className={styles.linkCol}>
                            <h4>CONNECT</h4>
                            <div className={styles.socialList}>
                                <a href="https://wa.me/917907314022" target="_blank" className={styles.socialItem}>
                                    <FaWhatsapp className={styles.socialIcon} style={{ color: '#25D366' }} /> WhatsApp
                                </a>
                                <a href="https://instagram.com/Izeexo" target="_blank" className={styles.socialItem}>
                                    <FaInstagram className={styles.socialIcon} style={{ color: '#E1306C' }} /> Instagram
                                </a>
                                <a href="mailto:hello@izeexo.com" className={styles.socialItem}>
                                    <FaEnvelope className={styles.socialIcon} style={{ color: '#EA4335' }} /> Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM BAR */}
                <div className={styles.bottomBar}>
                    <p>&copy; 2025 Izeexo. All rights reserved.</p>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy">Privacy</Link>
                        <Link href="/terms">Terms</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
