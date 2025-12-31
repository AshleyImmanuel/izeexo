"use client";

import { use } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import toast from "react-hot-toast";

// Mock Data (in real app, fetch from generic API/DB)
const products = {
    "1": { id: 1, title: "Modern Logo Pack", price: 3999, category: "Logo Design", description: "A comprehensive collection of modern, minimalist logos suitable for any tech startup." },
    "2": { id: 2, title: "Gala Dress Sketch", price: 6999, category: "Fashion Design", description: "Exclusive sketch and conceptual design for a luxury gala evening gown." },
    "3": { id: 3, title: "Costume Pattern Set", price: 9500, category: "Fashion Design", description: "Detailed sewing patterns and material guide for theatrical costumes." },
    "4": { id: 4, title: "Minimalist Brand Guide", price: 2999, category: "Branding", description: "Standard brand guidelines template including typography, color palette, and usage rules." },
    "5": { id: 5, title: "Abstract Icon Set", price: 1499, category: "Logo Design", description: "Vector icon set with abstract geometric shapes for modern app interfaces." },
    "6": { id: 6, title: "Summer Dress Blueprint", price: 4500, category: "Fashion Design", description: "Technical blueprint and measurements for a breezy summer dress collection." },
};

export default function ProductPage({ params }) {
    // Unwrap params using React.use() as per Next.js 15+ guidance
    const resolvedParams = use(params);
    const product = products[resolvedParams.id] || {
        title: "Product Not Found",
        price: 0,
        description: "This product does not exist.",
        category: "N/A"
    };

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <Link href="/store" className={styles.backLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Store
                </Link>

                <div className={styles.grid}>
                    <div className={styles.imageSection}>
                        {/* Placeholder for Product Image */}
                        <div className={styles.imagePlaceholder}>
                            {product.title}
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.price}>₹{product.price.toLocaleString("en-IN")}</p>

                        <p className={styles.description}>{product.description}</p>

                        <button
                            className="btn btn-primary"
                            onClick={() => toast.success("Added to cart!")}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
