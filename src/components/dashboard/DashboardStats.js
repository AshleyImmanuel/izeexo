"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Clock, CreditCard, Package } from "lucide-react";
// No CSS module needed as we use inline styles
// We'll reuse the dashboard.module.css styles but we need to import them or replicate the structure. 
// Since CSS modules hash classes, we can't easily import from another page's module unless it's global or shared.
// However, the original page was using styles.statCard, etc.
// A better approach is to accept props or structure this to match exactly.
// To keep it simple and consistent:
// We will replicate the card structure and use inline styles matching the original or copy the CSS.
// Let's copy the relevant CSS into a new module or just use inline styles for the "dynamic" parts to match existing look perfectly.
// Actually, the best way is to make this a full replacement for the Stats Grid if possible, or just the one card.
// Let's replace the whole stats grid so we can control all of them or just the one. 
// The user wants "Items in Cart".

export default function DashboardStats({ totalOrders, totalProducts }) {
    const { cartCount } = useCart();

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            {/* Total Orders - Blue */}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                borderLeft: '4px solid #3b82f6',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Total Orders</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>{totalOrders || 0}</p>
                </div>
                <div style={{
                    padding: '0.75rem',
                    background: '#eff6ff', // blue-50
                    borderRadius: '12px',
                    height: 'fit-content'
                }}>
                    <Package size={24} color="#3b82f6" />
                </div>
            </div>

            {/* Items in Cart - Yellow */}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                borderLeft: '4px solid #f59e0b',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Items in Cart</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>{cartCount}</p>
                </div>
                <div style={{
                    padding: '0.75rem',
                    background: '#fffbeb', // amber-50
                    borderRadius: '12px',
                    height: 'fit-content'
                }}>
                    <ShoppingBag size={24} color="#f59e0b" />
                </div>
            </div>

            {/* Total Items in Store - Green (Replacing Completed) */}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                borderLeft: '4px solid #10b981',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Store Items</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>{totalProducts || 0}</p>
                </div>
                <div style={{
                    padding: '0.75rem',
                    background: '#ecfdf5', // emerald-50
                    borderRadius: '12px',
                    height: 'fit-content'
                }}>
                    <ShoppingBag size={24} color="#10b981" />
                </div>
            </div>
        </div>
    );
}
