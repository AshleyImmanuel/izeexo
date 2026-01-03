"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../dashboard.module.css";
import { User, Mail, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className={styles.dashboardPage}>
            {/* Header */}
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Profile Settings</h1>
                <p className={styles.pageSubtitle}>Manage your personal account details.</p>
            </header>

            {/* Profile Content Grid */}
            <div className={styles.contentGrid}>

                {/* Main Profile Card */}
                <div className={styles.leftColumn}>
                    <div className={styles.card}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '4px solid #fff',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    position: 'relative',
                                    backgroundColor: '#f3f4f6'
                                }}>
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '2.5rem',
                                            fontWeight: '600',
                                            color: '#9ca3af'
                                        }}>
                                            {session.user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: '0 0 0.25rem 0' }}>
                                        {session.user.name}
                                    </h2>
                                    <p style={{ color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#10b981'
                                        }}></span>
                                        Active Customer
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                    Full Name
                                </label>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <User size={20} color="#6b7280" />
                                    <span style={{ color: '#374151', fontWeight: '500' }}>{session.user.name}</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                    Email Address
                                </label>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <Mail size={20} color="#6b7280" />
                                    <span style={{ color: '#374151', fontWeight: '500' }}>{session.user.email}</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                    Security Role
                                </label>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <Shield size={20} color="#6b7280" />
                                    <span style={{ color: '#374151', fontWeight: '500' }}>Authenticated User via Google</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className={styles.rightColumn}>
                    <div className={styles.recentActivityCard} style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>Account Actions</h3>

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#fef2f2',
                                color: '#ef4444',
                                border: '1px solid #fee2e2',
                                borderRadius: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.borderColor = '#fca5a5';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = '#fef2f2';
                                e.currentTarget.style.borderColor = '#fee2e2';
                            }}
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>

                        <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center', lineHeight: '1.5' }}>
                            Need help with your account?<br />
                            <a href="/contact" style={{ color: '#6366f1', textDecoration: 'none' }}>Contact Support</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
