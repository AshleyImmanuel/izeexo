"use client";

import styles from "./page.module.css";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        For Custom Designs or Enquiries Leave A Message
                    </p>
                </div>

                <div className={styles.linksGrid}>
                    <a
                        href="https://wa.me/917907314022"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkCard} ${styles.whatsapp}`}
                    >
                        <div className={styles.iconWrapper}>
                            <FaWhatsapp />
                        </div>
                        <h3>WhatsApp</h3>
                        <p>Chat with us</p>
                    </a>

                    <a
                        href="https://instagram.com/Izeexo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkCard} ${styles.instagram}`}
                    >
                        <div className={styles.iconWrapper}>
                            <FaInstagram />
                        </div>
                        <h3>Instagram</h3>
                        <p>@Izeexo</p>
                    </a>

                    <a
                        href="mailto:suryadevpm8@gmail.com"
                        className={`${styles.linkCard} ${styles.email}`}
                    >
                        <div className={styles.iconWrapper}>
                            <FaEnvelope />
                        </div>
                        <h3>Email</h3>
                        <p>suryadevpm8@gmail.com</p>
                    </a>
                </div>
            </div>
        </main>
    );
}
