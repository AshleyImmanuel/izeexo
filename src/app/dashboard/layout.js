"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin?callbackUrl=/dashboard");
        }
    }, [status, router]);

    if (status === "loading") {
        return <DashboardLoader text="AUTHENTICATING..." />;
    }

    if (!session) {
        return null;
    }

    return (
        <div className={styles.dashboardLayout}>
            <Navbar />
            <main className={styles.mainWrapper}>
                {children}
            </main>
        </div>
    );
}
