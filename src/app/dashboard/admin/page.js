import { getServerSession } from "next-auth";
import Link from "next/link";
import { Package, Users, ShoppingBag, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import styles from "../dashboard.module.css";
import prisma from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    // 1. Fetch Real Data
    const totalOrders = await prisma.order.count();
    const activeCustomers = await prisma.user.count();

    // 2. Calculate Monthly Revenue
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const revenueResult = await prisma.order.aggregate({
        _sum: {
            amount: true
        },
        where: {
            createdAt: {
                gte: firstDayOfMonth
            }
        }
    });

    const monthlyRevenue = revenueResult._sum.amount ? Number(revenueResult._sum.amount) : 0;

    // Format Currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className={styles.dashboardPage}>
            <header className={styles.pageHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={32} className="text-gray-900" />
                    <div>
                        <h1 className={styles.pageTitle}>Admin Console</h1>
                        <p className={styles.pageSubtitle}>Welcome back, {session?.user?.name}</p>
                    </div>
                </div>
            </header>

            <div className={styles.contentGrid}>
                {/* Stats Row */}
                <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                    <StatCard
                        icon={<ShoppingBag size={24} color="#3b82f6" />}
                        label="Total Orders"
                        value={totalOrders.toString()}
                        trend="Lifetime count"
                    />
                    <StatCard
                        icon={<Users size={24} color="#10b981" />}
                        label="Registered Users"
                        value={activeCustomers.toString()}
                        trend="Total accounts"
                    />
                    <StatCard
                        icon={<TrendingUp size={24} color="#f59e0b" />}
                        label="Monthly Revenue"
                        value={formatCurrency(monthlyRevenue)}
                        trend="This month"
                    />
                </div>

                {/* Quick Actions */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>Management Tools</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                        <DashboardLink
                            href="/dashboard/admin/orders"
                            icon={<Package size={24} />}
                            title="Manage Orders"
                            description="View, track, and process customer orders."
                        />
                        <DashboardLink
                            href="/dashboard/admin/products"
                            icon={<ShoppingBag size={24} />}
                            title="Product Inventory"
                            description="Add new designs, manage stock, and edit listings."
                        />
                        <DashboardLink
                            href="/dashboard/admin/users"
                            icon={<Users size={24} />}
                            title="User Management"
                            description="Manage customer accounts and admin roles."
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, trend }) {
    return (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '12px' }}>
                    {icon}
                </div>
            </div>
            <div style={{ marginTop: '0.5rem' }}>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>{label}</p>
                <h3 style={{ color: '#111827', fontSize: '1.75rem', fontWeight: '700' }}>{value}</h3>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                    {trend}
                </p>
            </div>
        </div>
    )
}

function DashboardLink({ href, icon, title, description }) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                height: '100%'
            }}>
                <div style={{
                    padding: '1rem',
                    background: '#111827',
                    color: '#fff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>{title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.4' }}>{description}</p>
                </div>
                <ArrowRight size={20} color="#d1d5db" />
            </div>
        </Link>
    )
}
