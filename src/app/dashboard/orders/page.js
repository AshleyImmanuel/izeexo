"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import toast from "react-hot-toast";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        try {
            const response = await fetch("/api/dashboard/orders");
            const data = await response.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    // ... import removed from here

    // ... existing imports

    // ... inside component

    if (loading) {
        return <DashboardLoader text="Loading orders..." />;
    }

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div>
                        <h1>Order History</h1>
                        <p>View and manage your orders</p>
                    </div>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No orders yet</p>
                </div>
            ) : (
                <div className={styles.ordersList}>
                    {orders.map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <h3>Order #{order.id.slice(0, 8)}</h3>
                                <div className={styles.statusContainer}>
                                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                        {order.status === 'PENDING' ? 'Verifying Payment' :
                                            order.status === 'PROCESSING' ? 'Order Confirmed' :
                                                order.status === 'COMPLETED' ? 'Delivered' : order.status}
                                    </span>
                                    {order.status === 'PENDING' && (
                                        <p className={styles.statusHelper}>
                                            We are verifying your payment details. This usually takes 10-20 minutes.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.orderDetails}>
                                <div className={styles.detailRow}>
                                    <span>Product</span>
                                    <strong>{order.product?.title || "Unknown Product"}</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Quantity</span>
                                    <strong>{order.quantity || 1}</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Amount</span>
                                    <strong>${order.amount}</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Date</span>
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
