"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Mock Data (Updated with Media Array)
const products = {
    "1": {
        id: 1,
        title: "Modern Logo Pack",
        price: 3999,
        category: "Logo Design",
        description: "A comprehensive collection of modern, minimalist logos suitable for any tech startup.",
        media: [
            { type: 'image', src: "/assets/logos.png" },
            { type: 'image', src: "/assets/sketch.png" }, // Mocking extra images
            { type: 'image', src: "/assets/pattern.png" }
        ]
    },
    "2": {
        id: 2,
        title: "Gala Dress Sketch",
        price: 6999,
        category: "Fashion Design",
        description: "Exclusive sketch and conceptual design for a luxury gala evening gown.",
        media: [
            { type: 'image', src: "/assets/sketch.png" },
            { type: 'image', src: "/assets/pattern.png" }
        ]
    },
    // ... Add more mock data as needed, defaulting to single image for now if complex
    "3": { id: 3, title: "Costume Pattern Set", price: 9500, category: "Fashion Design", description: "Detailed sewing patterns.", media: [{ type: 'image', src: "/assets/pattern.png" }] },
    "4": { id: 4, title: "Minimalist Brand Guide", price: 2999, category: "Branding", description: "Standard brand guidelines.", media: [{ type: 'image', src: "/assets/logos.png" }] },
    "5": { id: 5, title: "Abstract Icon Set", price: 1499, category: "Logo Design", description: "Vector icon set.", media: [{ type: 'image', src: "/assets/logos.png" }] },
    "6": { id: 6, title: "Summer Dress Blueprint", price: 4500, category: "Fashion Design", description: "Technical blueprint.", media: [{ type: 'image', src: "/assets/sketch.png" }] },
};

export default function ProductPage({ params }) {
    const resolvedParams = use(params);
    const { data: session } = useSession();
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    const product = products[resolvedParams.id] || {
        title: "Product Not Found",
        price: 0,
        description: "This product does not exist.",
        category: "N/A",
        media: []
    };

    const handleAddToCart = () => {
        if (!session) {
            toast.error("Please login to purchase");
            router.push("/auth/signin?callbackUrl=" + window.location.pathname);
            return;
        }
        toast.success("Added to cart!");
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % product.media.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + product.media.length) % product.media.length);
    };

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <Link href="/store" className={styles.backLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Store
                </Link>

                <div className={styles.grid}>
                    {/* Media Carousel Section */}
                    <div className={styles.imageSection}>
                        <div className={styles.carouselContainer}>

                            {/* Main Media Display */}
                            <div className={styles.imagePlaceholder}>
                                {product.media[activeIndex]?.type === 'video' ? (
                                    <video
                                        src={product.media[activeIndex].src}
                                        controls
                                        className={styles.mainMedia}
                                    />
                                ) : (
                                    product.media[activeIndex]?.src ? (
                                        <Image
                                            src={product.media[activeIndex].src}
                                            alt={`${product.title} - View ${activeIndex + 1}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            priority={activeIndex === 0}
                                            unoptimized
                                        />
                                    ) : (
                                        <span>No Media Available</span>
                                    )
                                )}
                            </div>

                            {/* Navigation Arrows (Only if > 1 item) */}
                            {product.media.length > 1 && (
                                <>
                                    <button onClick={prevSlide} className={`${styles.navBtn} ${styles.prevBtn}`}>
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={nextSlide} className={`${styles.navBtn} ${styles.nextBtn}`}>
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.media.length > 1 && (
                            <div className={styles.thumbnailStrip}>
                                {product.media.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`${styles.thumbnail} ${index === activeIndex ? styles.activeThumb : ''}`}
                                    >
                                        {item.type === 'video' ? (
                                            <div className={styles.videoThumbIcon}><Play size={12} fill="currentColor" /></div>
                                        ) : (
                                            <Image
                                                src={item.src}
                                                alt={`Thumb ${index}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                unoptimized
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.price}>₹{product.price.toLocaleString("en-IN")}</p>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.actionButtons}>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button
                                className={`${styles.buyBtn}`}
                                onClick={() => {
                                    if (!session) {
                                        router.push("/auth/signin?callbackUrl=" + window.location.pathname);
                                    } else {
                                        toast.success("Proceeding to checkout...");
                                        // router.push('/checkout');
                                    }
                                }}
                            >
                                Buy Design
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
