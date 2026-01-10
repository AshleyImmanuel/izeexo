"use client";

import { useState, useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/store/ProductFilters";
import styles from "./page.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorePage() {
    const containerRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("none");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // State for data
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dbCategories, setDbCategories] = useState(["All"]);

    // Price range state (Amazon-style)
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000); // High default max

    // Fetch Initial Data
    useEffect(() => {
        async function init() {
            try {
                const prodRes = await fetch('/api/products', { cache: 'no-store' });

                if (prodRes.ok) {
                    const data = await prodRes.json();
                    setProducts(data);

                    // Set max price to highest product price
                    if (data.length > 0) {
                        const highest = Math.max(...data.map(p => p.price));
                        setMaxPrice(highest);
                    }
                }

                // Fetch Categories explicitly
                const catRes = await fetch('/api/admin/categories');
                if (catRes.ok) {
                    const catData = await catRes.json();
                    setDbCategories(["All", ...catData.map(c => c.name)]);
                }
            } catch (error) {
                console.error("Failed to load store data:", error);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);


    useGSAP(() => {
        if (loading) return; // Don't animate if loading

        // Check if there are any products to animate
        const cards = containerRef.current?.querySelectorAll(".product-card-anim");
        if (!cards || cards.length === 0) return;

        // Staggered reveal for products when filter changes or on load
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        });
    }, { scope: containerRef, dependencies: [loading, activeCategory, searchTerm, minPrice, maxPrice] });

    // Filter & Sort Logic
    const filteredProducts = products
        .filter(product => {
            const matchesCategory = activeCategory === "All" || product.category === activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            return matchesCategory && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            if (sortOption === "none") return 0; // No sorting - keep original order
            if (sortOption === "featured") return 0; // Featured - keep original order (can be customized later)
            if (sortOption === "price-low") return a.price - b.price;
            if (sortOption === "price-high") return b.price - a.price;
            return 0; // default
        });

    const sortLabels = {
        "none": "Sort by: None",
        "featured": "Sort by: Featured",
        "price-low": "Price: Low to High",
        "price-high": "Price: High to Low"
    };

    return (
        <main className={styles.main} ref={containerRef}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Design Store</h1>
                    <p className={styles.subtitle}>Premium resources for your next project.</p>
                </header>

                <ProductFilters
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    isSortOpen={isSortOpen}
                    setIsSortOpen={setIsSortOpen}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    categories={dbCategories}
                    sortLabels={sortLabels}
                />

                {/* Results Grid */}
                <div className={styles.grid}>
                    {filteredProducts.map((product, index) => (
                        <div key={product.id} className="product-card-anim">
                            <ProductCard product={product} />
                        </div>
                    ))}
                    {filteredProducts.length === 0 && !loading && (
                        <div className={styles.noResults}>
                            <p>No products found matching your criteria.</p>
                            <button
                                className={styles.clearBtn}
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory("All");
                                    setMinPrice(0);
                                    const highest = products.length > 0 ? Math.max(...products.map(p => p.price)) : 100000;
                                    setMaxPrice(highest);
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                    {loading && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner}></div>
                            <p className={styles.loadingText}>Loading Products...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
