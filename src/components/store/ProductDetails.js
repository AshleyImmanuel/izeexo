"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Play, ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "@/app/store/[id]/page.module.css"; // Reuse existing styles

export default function ProductDetails({ product }) {
    const { data: session } = useSession();
    const router = useRouter();
    const { addToCart } = useCart();
    const [activeIndex, setActiveIndex] = useState(0);

    // Process media from images array
    // We treat the first image as the main one usually, but here we treat all as media
    // Detect video by URL content
    const media = product.images && product.images.length > 0 ? product.images.map(url => {
        const isVideo = url.includes("/video/") || /\.(mp4|webm|mov)$/i.test(url);
        return {
            type: isVideo ? 'video' : 'image',
            src: url
        };
    }) : [{ type: 'image', src: '/placeholder.jpg' }];

    const handleAddToCart = () => {
        addToCart(product);
        toast.success("Added to cart!");
    };

    const handleBuyNow = () => {
        if (!session) {
            toast.error("Please login to purchase");
            router.push("/auth/signin?callbackUrl=" + window.location.pathname);
            return;
        }

        // WhatsApp Checkout Logic
        const message = `Hi, I would like to purchase: ${product.title} (ID: ${product.id})`;
        const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917907314022'}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % media.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>
                <Link href="/store" className={styles.backLink}>
                    <ChevronLeft size={20} />
                    Back to Store
                </Link>

                <div className={styles.grid}>
                    {/* Media Carousel Section */}
                    <div className={styles.imageSection}>
                        <div className={styles.carouselContainer}>

                            {/* Main Media Display */}
                            <div className={styles.imagePlaceholder}>
                                {media[activeIndex]?.type === 'video' ? (
                                    <video
                                        src={media[activeIndex].src}
                                        controls
                                        className={styles.mainMedia}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <Image
                                        src={media[activeIndex]?.src || '/placeholder.jpg'}
                                        alt={`${product.title} - View ${activeIndex + 1}`}
                                        fill
                                        className={styles.mainMedia}
                                        style={{ objectFit: 'contain' }}
                                        priority={activeIndex === 0}
                                        unoptimized
                                    />
                                )}
                            </div>

                            {/* Navigation Arrows (Only if > 1 item) */}
                            {media.length > 1 && (
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
                        {media.length > 1 && (
                            <div className={styles.thumbnailStrip}>
                                {media.map((item, index) => (
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
                        <p className={styles.price}>₹{Number(product.price).toLocaleString("en-IN")}</p>

                        <div className={styles.description}>
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className={styles.actionButtons}>
                            <button
                                className={styles.cartBtn}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button
                                className={styles.buyBtn}
                                onClick={handleBuyNow}
                            >
                                <Zap size={20} fill="currentColor" />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
