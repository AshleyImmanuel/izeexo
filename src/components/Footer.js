"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaArrowRight, FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>





                {/* 2. CONTENT GRID */}
                <div className={styles.footerContentGrid}>

                    {/* Brand Column */}
                    <div className={styles.brandColumn}>
                        <div className={styles.logoRow}>
                            {/* Assuming logo is available, using text for now if image not perfect size */}
                            <h3 className={styles.brandName}>IZEEXO.</h3>
                        </div>
                        <p className={styles.brandDesc}>
                            A Premium Design Studio Visualizing The Extraordinary For Forward-Thinking Brands.
                        </p>
                        <Link
                            href="/contact"
                            className={styles.ctaButton}
                            prefetch={false}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            For Custom Designs or Logo <FaArrowRight className={styles.btnIcon} />
                        </Link>
                        <div className={styles.studioInfo}>
                            <p>EST. 2025</p>
                            <p>DESIGN STUDIO</p>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={styles.footerLinksGroup}>
                        <div className={styles.footerLinkCol}>
                            <h4>EXPLORE</h4>
                            <Link href="/" prefetch={false}>Home</Link>
                            <Link href="/store" prefetch={false}>Store</Link>
                            <Link href="/about" prefetch={false}>About</Link>
                        </div>

                        <div className={styles.footerLinkCol}>
                            <h4>CONNECT</h4>
                            <div className={styles.footerSocialList}>
                                <a href="https://wa.me/917907314022" target="_blank" className={styles.socialItem}>
                                    <FaWhatsapp className={styles.socialIcon} style={{ color: '#25D366' }} /> WhatsApp
                                </a>
                                <a href="https://instagram.com/Izeexo" target="_blank" className={styles.socialItem}>
                                    <FaInstagram className={styles.socialIcon} style={{ color: '#E1306C' }} /> Instagram
                                </a>
                                <a href="https://youtube.com/@izeexo" target="_blank" className={styles.socialItem}>
                                    <FaYoutube className={styles.socialIcon} style={{ color: '#FF0000' }} /> YouTube
                                </a>
                                <a href="mailto:suryadevpm8@gmail.com" className={styles.socialItem}>
                                    <FaEnvelope className={styles.socialIcon} style={{ color: '#EA4335' }} /> Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM BAR */}
                <div className={styles.bottomBar}>
                    <p>&copy; 2025 IZEEXO. All Rights Reserved.</p>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy" prefetch={false}>Privacy</Link>
                        <span style={{ margin: "0 0.5rem" }}>|</span>
                        <Link href="/terms" prefetch={false}>Terms</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
