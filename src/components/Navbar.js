"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useSession, signOut } from "next-auth/react";
import "@/components/ui/PillNav.css";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        setActivePath(pathname);
        setIsProfileDropdownOpen(false); // Close dropdown on visual nav change
    }, [pathname]);

    const logoRef = useRef(null);
    const navItemsRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const dropdownRef = useRef(null);


    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Store", href: "/store" },
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

                        {/* Dedicated Dashboard Button (Logged In) */}
                        {session && (
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={`pill ${activePath.startsWith('/dashboard') ? 'is-active' : ''}`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {/* Auth Button / Profile Pic */}
                        <li>
                            {session ? (
                                <Link
                                    href="/dashboard/profile"
                                    className="pill pill-avatar"
                                    title="Profile Settings"
                                >
                                    <div className="avatar-wrapper">
                                        {session.user.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name}
                                                width={32}
                                                height={32}
                                                className="avatar-image-real"
                                            />
                                        ) : (
                                            <span className="avatar-circle">
                                                {session.user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/auth/signin" className="pill">
                                    Login
                                </Link>
                            )}
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
                        {session ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="mobile-menu-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    className="mobile-menu-link logout-link"
                                    onClick={() => { setIsMobileMenuOpen(false); signOut(); }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/signin"
                                className="mobile-menu-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}
