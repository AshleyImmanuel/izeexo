"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useSession, signIn, signOut } from "next-auth/react";
import "@/components/ui/PillNav.css";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    const logoRef = useRef(null);
    const navItemsRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Store", href: "/store" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        // Simple initial load animation
        const logo = logoRef.current;
        const navItems = navItemsRef.current;

        if (logo) {
            gsap.fromTo(logo, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'power3.out' });
        }
        if (navItems) {
            gsap.fromTo(navItems, { width: 0 }, { width: 'auto', duration: 0.6, ease: 'power3.out' });
        }
    }, []);

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const menu = mobileMenuRef.current;
        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: 'visible' });
                gsap.fromTo(menu, { opacity: 0, y: 10, scaleY: 0.9 }, { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: 'power3.out' });
            } else {
                gsap.to(menu, { opacity: 0, y: 10, scaleY: 0.9, duration: 0.2, ease: 'power3.out', onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
            }
        }
    };

    return (
        <div className="pill-nav-container">
            <nav className="pill-nav">
                <Link href="/" className="pill-logo" ref={logoRef}>
                    <Image src="/logo.jpg" alt="Izeexo" width={40} height={40} priority />
                </Link>

                <div className="pill-nav-items desktop-only" ref={navItemsRef}>
                    <ul className="pill-list">

                        {navLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`pill ${activePath === item.href ? 'is-active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        {/* Auth Button */}
                        <li>
                            <button
                                className="pill"
                                onClick={() => session ? signOut() : signIn("google")}
                            >
                                {session ? "Logout" : "Login"}
                            </button>
                        </li>
                    </ul>
                </div>

                <button className="mobile-menu-button mobile-only" onClick={toggleMobileMenu}>
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                </button>
            </nav>

            <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef}>
                <ul className="mobile-menu-list">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            className="mobile-menu-link"
                            style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none' }}
                            onClick={() => { setIsMobileMenuOpen(false); session ? signOut() : signIn("google"); }}
                        >
                            {session ? "Logout" : "Login"}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
