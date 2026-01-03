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
            {children}
        </div>
    );
}
