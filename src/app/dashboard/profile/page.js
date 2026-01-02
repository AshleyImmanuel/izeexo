"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../dashboard.module.css";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <h1>Profile</h1>
                <p>Manage your account information</p>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <Image
                        src={session.user.image || "/default-avatar.png"}
                        alt={session.user.name}
                        width={80}
                        height={80}
                        className={styles.profileAvatar}
                    />
                    <div>
                        <h2>{session.user.name}</h2>
                        <p>{session.user.email}</p>
                    </div>
                </div>

                <div className={styles.profileSection}>
                    <h3>Account Information</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label>Name</label>
                            <p>{session.user.name}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Email</label>
                            <p>{session.user.email}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Account Type</label>
                            <p>Customer</p>
                        </div>
                    </div>
                </div>

                <div className={styles.profileSection}>
                    <h3>Preferences</h3>
                    <p className={styles.comingSoon}>Preference settings coming soon...</p>
                </div>
            </div>
        </div>
    );
}
