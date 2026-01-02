"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { toast } from 'react-hot-toast';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            if (!res.ok) {
                if (res.status === 401) throw new Error("Unauthorized Access");
                throw new Error("Failed to fetch orders");
            }
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <DashboardLayout><div>Loading Orders...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>All Customer Orders</h1>

                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', color: '#666', fontSize: '0.9rem', textAlign: 'left' }}>
                                <th style={{ padding: '1.25rem' }}>Order ID</th>
                                <th style={{ padding: '1.25rem' }}>Customer</th>
                                <th style={{ padding: '1.25rem' }}>Product</th>
                                <th style={{ padding: '1.25rem' }}>Qty</th>
                                <th style={{ padding: '1.25rem' }}>Amount</th>
                                <th style={{ padding: '1.25rem' }}>Date</th>
                                <th style={{ padding: '1.25rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                        #{order.id.slice(-6).toUpperCase()}
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {order.user.image && <img src={order.user.image} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />}
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{order.user.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', fontWeight: '500' }}>{order.product.title}</td>
                                    <td style={{ padding: '1.25rem' }}>{order.quantity}</td>
                                    <td style={{ padding: '1.25rem', fontWeight: '600' }}>${order.amount}</td>
                                    <td style={{ padding: '1.25rem', color: '#666' }}>{order.date}</td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <span style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '50px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: order.status === 'COMPLETED' ? '#dcfce7' : '#fef9c3',
                                            color: order.status === 'COMPLETED' ? '#166534' : '#854d0e'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
