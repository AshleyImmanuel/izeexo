import { Package, Clock, CreditCard, LayoutDashboard, FileText } from "lucide-react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getData() {
    const session = await getServerSession(authOptions);
    if (!session) return { stats: null, recentActivity: [] };

    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/stats`, {
            method: "GET",
            headers: {
                "Cookie": `next-auth.session-token=${session?.user?.id || ''}`
            }
        });
        if (!res.ok) return { stats: null, recentActivity: [] };
        return res.json();
    } catch (e) {
        return { stats: null, recentActivity: [] };
    }
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const { stats, recentActivity = [] } = await getData();

    return (
        <div className={styles.dashboardPage}>
            {/* Header */}
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Dashboard</h1>
                <p className={styles.pageSubtitle}>
                    Welcome back, <span className={styles.userName}>{session?.user?.name}</span>
                </p>
            </header>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                {/* Total Orders - Blue */}
                <div className={`${styles.statCard} ${styles.blue}`}>
                    <div className={styles.statInfo}>
                        <h3>Total Orders</h3>
                        <p className={styles.statValue}>{stats?.totalOrders || 0}</p>
                    </div>
                    <div className={styles.statIcon}>
                        <Package size={24} />
                    </div>
                </div>

                {/* Active Requests - Yellow */}
                <div className={`${styles.statCard} ${styles.yellow}`}>
                    <div className={styles.statInfo}>
                        <h3>Active Requests</h3>
                        <p className={styles.statValue}>{stats?.activeProjects || 0}</p>
                    </div>
                    <div className={styles.statIcon}>
                        <Clock size={24} />
                    </div>
                </div>

                {/* Completed - Gray */}
                <div className={`${styles.statCard} ${styles.gray}`}>
                    <div className={styles.statInfo}>
                        <h3>Completed</h3>
                        <p className={styles.statValue}>{stats?.completedProjects || 0}</p>
                    </div>
                    <div className={styles.statIcon}>
                        <CreditCard size={24} />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className={styles.contentGrid}>
                {/* Left Column: Your Orders (My Courses eq) */}
                <div className={styles.leftColumn}>
                    <h2 className={styles.sectionTitle}>Your Orders</h2>
                    <div className={styles.card}>
                        <div className={styles.emptyIcon}>
                            <LayoutDashboard size={48} strokeWidth={1} />
                        </div>
                        <h3 className={styles.emptyText}>No Recent Orders</h3>
                        <p className={styles.emptySubtext}>
                            Once you purchase items from the store, they will appear here ready for download.
                        </p>
                        <Link href="/store">
                            <button className={styles.actionButton}>Browse Store</button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Recent Activity */}
                <div className={styles.rightColumn}>
                    <h2 className={styles.sectionTitle}>Recent Activity</h2>
                    <div className={styles.recentActivityCard}>
                        {recentActivity.length > 0 ? (
                            <div className={styles.activityList}>
                                {recentActivity.map((item, index) => (
                                    <div key={index} className={styles.activityItem}>
                                        <div className={styles.activityIcon}>
                                            <FileText size={16} />
                                        </div>
                                        <div className={styles.activityDetails}>
                                            <p className={styles.activityTitle}>{item.title}</p>
                                            <p className={styles.activityTime}>{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noActivity}>No recent activity</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
