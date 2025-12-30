import Link from "next/link";
import styles from "./Footer.module.css";
import { FaWhatsapp, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>Izeexo</h2>
                    <p className={styles.tagline}>Visualizing the Extraordinary.</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.column}>
                        <h3 className={styles.heading}>Explore</h3>
                        <Link href="/" className={styles.link}>Home</Link>
                        <Link href="/store" className={styles.link}>Store</Link>
                        <Link href="/services" className={styles.link}>Services</Link>
                        <Link href="/about" className={styles.link}>About</Link>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.heading}>Connect</h3>
                        <div className={styles.socialGrid}>
                            <Link href="https://wa.me/" target="_blank" className={`${styles.socialLink} ${styles.whatsapp}`}>
                                <FaWhatsapp />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" className={`${styles.socialLink} ${styles.instagram}`}>
                                <FaInstagram />
                            </Link>
                            <Link href="https://youtube.com" target="_blank" className={`${styles.socialLink} ${styles.youtube}`}>
                                <FaYoutube />
                            </Link>
                            <Link href="mailto:hello@izeexo.com" className={`${styles.socialLink} ${styles.email}`}>
                                <FaEnvelope />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; 2025 Izeexo Design Studio. All rights reserved.</p>
            </div>
        </footer>
    );
}
