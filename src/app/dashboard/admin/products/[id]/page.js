"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Save, Trash2, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import styles from "../../../dashboard.module.css";
import MediaUpload from "@/components/admin/MediaUpload";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import CustomSelect from "@/components/ui/CustomSelect";

export default function EditProductPage({ params }) {
    // Unwrap params using React.use()
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        images: [],
        isFeatured: false
    });

    useEffect(() => {
        Promise.all([fetchProduct(), fetchCategories()]).finally(() => setLoading(false));
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/admin/products/${id}`);
            if (!res.ok) throw new Error("Failed to fetch product");
            const data = await res.json();
            setFormData({
                title: data.title,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId,
                images: data.images,
                isFeatured: data.isFeatured
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories');
            if (res.ok) setCategories(await res.json());
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to update product");

            toast.success("Product updated successfully!");
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Failed to delete product");
            toast.success("Product deleted");
            router.push('/dashboard/admin/products');
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading) return <DashboardLoader text="LOADING PRODUCT..." />;

    return (
        <div className={styles.dashboardPage}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <Link href="/dashboard/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            <ArrowLeft size={16} />
                            Back to Products
                        </Link>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Edit Product</h1>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>ID: {id}</p>
                    </div>
                    <button
                        onClick={handleDelete}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #fee2e2', background: '#fef2f2', color: '#ef4444', cursor: 'pointer', display: 'flex', gap: '0.5rem' }}
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'visible' }}>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                        <textarea name="description" required rows={4} value={formData.description} onChange={handleChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>

                    <div className={styles.formTwoCol}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price (₹)</label>
                            <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                            <CustomSelect
                                options={categories.map(c => ({ value: c.id, label: c.name }))}
                                value={formData.categoryId}
                                onChange={(val) => setFormData(prev => ({ ...prev, categoryId: val }))}
                                placeholder="Select a category"
                                searchable={true}
                            />
                        </div>
                    </div>

                    {/* Media Upload Section */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Media (Images & Videos)</label>
                        <MediaUpload mediaUrls={formData.images} onUpdate={(urls) => setFormData(prev => ({ ...prev, images: urls }))} />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
                            <span style={{ fontWeight: '500' }}>Mark as Featured Product</span>
                        </label>
                    </div>

                    <button type="submit" disabled={saving}
                        style={{ width: '100%', padding: '1rem', background: '#111', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: saving ? 0.7 : 1 }}>
                        {saving ? <Loader2 size={20} className={styles.spin} /> : <Save size={20} />}
                        {saving ? 'Saving Changes...' : 'Save Changes'}
                    </button>

                </form>
            </div>

        </div>
    );
}
