import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import styles from "../../dashboard.module.css";
import { User, Shield } from "lucide-react";
import Image from "next/image";

export default async function UserManagement() {
    const session = await getServerSession(authOptions);

    // Fetch all users sorted by most recent
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            isAdmin: true, // Assuming this field exists based on schema, or we rely on logic
        }
    });

    // Helper to format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.dashboardPage}>
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>User Management</h1>
                <p className={styles.pageSubtitle}>View and manage registered accounts.</p>
            </header>

            <div className={styles.contentGrid}>
                <div style={{ gridColumn: '1 / -1', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>

                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(250px, 2fr) 2fr 1fr 1fr',
                        padding: '1rem 1.5rem',
                        background: '#f9fafb',
                        borderBottom: '1px solid #e5e7eb',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        <div>User</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div style={{ textAlign: 'right' }}>Joined</div>
                    </div>

                    {/* Table Rows */}
                    <div>
                        {users.map(user => {
                            // Determine role based on admin check (logic from auth route)
                            // Note: We are using the environment variable check in auth, but for display we can check if they ARE the admin
                            // OR if we added an 'isAdmin' field. For now, let's assume the email match logic applies.
                            const isAdmin = user.email === process.env.ADMIN_EMAIL;

                            return (
                                <div key={user.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'minmax(250px, 2fr) 2fr 1fr 1fr',
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid #f3f4f6',
                                    alignItems: 'center',
                                    transition: 'background 0.2s'
                                }}
                                    className="hover:bg-gray-50"
                                >
                                    {/* User Column */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            background: '#f3f4f6',
                                            position: 'relative',
                                            flexShrink: 0
                                        }}>
                                            {user.image ? (
                                                <Image src={user.image} alt={user.name || 'User'} fill style={{ objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                                                    <User size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', margin: 0 }}>{user.name || 'Anonymous'}</p>
                                        </div>
                                    </div>

                                    {/* Email Column */}
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                        {user.email}
                                    </div>

                                    {/* Role Column */}
                                    <div>
                                        {isAdmin ? (
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                padding: '0.25rem 0.5rem',
                                                background: '#eff6ff',
                                                color: '#1d4ed8',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                borderRadius: '99px'
                                            }}>
                                                <Shield size={12} />
                                                Admin
                                            </span>
                                        ) : (
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                background: '#f3f4f6',
                                                color: '#374151',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                borderRadius: '99px'
                                            }}>
                                                Customer
                                            </span>
                                        )}
                                    </div>

                                    {/* Joined Column */}
                                    <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#9ca3af' }}>
                                        {formatDate(user.createdAt)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
