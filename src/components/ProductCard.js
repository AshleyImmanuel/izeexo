"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, priority = false }) {
    return (
        <Link href={`/store/${product.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.image || '/assets/placeholder.png'}
                        alt={product.title}
                        fill
                        className={styles.image}
                        priority={priority}
                    />
                    {/* Overlay Removed as per user request */}
                </div>
                <div className={styles.info}>
                    <span className={styles.category}>{product.category}</span>
                    <h3 className={styles.title}>{product.title}</h3>
                    <div className={styles.bottomRow}>
                        <span className={styles.price}>₹{Number(product.price).toLocaleString("en-IN")}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
