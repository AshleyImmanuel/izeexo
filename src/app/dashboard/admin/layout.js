import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    // Strict Role Check using the injected role
    if (session.user.role !== "admin") {
        redirect("/dashboard"); // Kick non-admins back to user dashboard
    }

    return (
        <div style={{ padding: '0rem' }}>
            {/* Optional: Add Admin-specific Header or Sidebar here if needed */}
            <div style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                textAlign: 'center',
                borderBottom: '1px solid #fecaca'
            }}>
                ADMIN MODE ACTIVE • {session.user.email}
            </div>
            {children}
        </div>
    );
}
