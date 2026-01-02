"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styles from "./DashboardNavbar.module.css";

export default function DashboardNavbar({ user }) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Store", href: "/store" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Dashboard", href: "/dashboard" },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>ZE</div>
                    <span>IZEEXO</span>
                </Link>

                {/* Desktop Nav */}
                <div className={styles.navLinks}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard')) ? styles.active : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Right Section: Avatar / Mobile Toggle */}
                <div className={styles.profileSection}>
                    <Link href="/dashboard" className={styles.avatarLink}>
                        <div className={styles.avatar}>
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        <span className={`${styles.bar} ${isMobileOpen ? styles.open : ''}`}></span>
                        <span className={`${styles.bar} ${isMobileOpen ? styles.open : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileOpen && (
                <div className={styles.mobileMenu}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.mobileLink}
                            onClick={() => setIsMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
