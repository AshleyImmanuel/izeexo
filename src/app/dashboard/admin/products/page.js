"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Package, Search, Plus, Edit, Trash2 } from "lucide-react";
import styles from "../../dashboard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId, productTitle) => {
        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    Delete "{productTitle}"?
                </span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const res = await fetch(`/api/admin/products/${productId}`, {
                                    method: 'DELETE'
                                });
                                if (!res.ok) throw new Error("Failed to delete product");
                                toast.success("Product deleted successfully!");
                                fetchProducts();
                            } catch (error) {
                                toast.error(error.message);
                            }
                        }}
                        style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            style: {
                background: '#fff',
                color: '#333',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6'
            },
        });
    };

    if (loading) return (
        <div className={styles.dashboardPage}>
            <div style={{
                height: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                color: '#6b7280'
            }}>
                <div className={styles.spin} style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #e5e7eb',
                    borderTopColor: '#2563eb',
                    borderRadius: '50%',
                }} />
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Loading Products...</span>
            </div>
        </div>
    );

    return (
        <div className={styles.dashboardPage}>
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Manage Products</h1>
                    <Link href="/dashboard/admin/products/new" style={{
                        background: '#111',
                        color: '#fff',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Plus size={18} />
                        Add New Product
                    </Link>
                </div>

                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', color: '#666', fontSize: '0.9rem', textAlign: 'left' }}>
                                <th style={{ padding: '1.25rem' }}>Image</th>
                                <th style={{ padding: '1.25rem' }}>Product Name</th>
                                <th style={{ padding: '1.25rem' }}>Category</th>
                                <th style={{ padding: '1.25rem' }}>Price</th>
                                <th style={{ padding: '1.25rem' }}>Orders</th>
                                <th style={{ padding: '1.25rem' }}>Date Added</th>
                                <th style={{ padding: '1.25rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: '#f3f4f6' }}>
                                            {product.images[0] && (
                                                <Image src={product.images[0]} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', fontWeight: '600' }}>{product.title}</td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <span style={{ background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', color: '#4b5563' }}>
                                            {product.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem', fontWeight: '600' }}>₹{product.price}</td>
                                    <td style={{ padding: '1.25rem' }}>{product.orderCount} sales</td>
                                    <td style={{ padding: '1.25rem', color: '#666' }}>{product.date}</td>
                                    <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <Link href={`/dashboard/admin/products/${product.id}`} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#666', display: 'inline-flex', alignItems: 'center' }}>
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.title)}
                                                style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #fee2e2', background: '#fef2f2', cursor: 'pointer', color: '#ef4444' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
                            <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>No products found. Start by adding one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
