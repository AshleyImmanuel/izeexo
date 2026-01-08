"use client";

import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();
    const drawerRef = useRef(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsCartOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [setIsCartOpen]);

    const handleCheckout = () => {
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+917907314022';

        // Build the message
        let message = `*New Order Request - Izeexo Store* \n\n`;

        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.title}* (${item.category})\n`;
            message += `   Qty: ${item.quantity} | Price: ₹${item.price.toLocaleString("en-IN")}\n\n`;
        });

        message += `*Total Amount: ₹${cartTotal.toLocaleString("en-IN")}*\n\n`;
        message += `I'd like to proceed with this order. Please guide me through payment and delivery.`;

        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        // Close modal implicitly via window change, or we can keep it open.
        // Let's keep it open or maybe clear it? For now, just leave it as is so user can verify.
    };

    if (!isCartOpen && typeof window !== 'undefined') {
        // Keep DOM clean when closed
    }

    return (
        <>
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`} ref={drawerRef}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <ShoppingBag size={20} />
                        Your Cart ({cart.length})
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.items}>
                    {cart.length === 0 ? (
                        <div className={styles.emptyState}>
                            <ShoppingBag size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemImageWrapper}>
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className={styles.itemImage}
                                        />
                                    ) : (
                                        <div className={styles.itemImage} style={{ background: '#eee' }} />
                                    )}
                                </div>

                                <div className={styles.itemInfo}>
                                    <div>
                                        <h4 className={styles.itemName}>{item.title}</h4>
                                        <p className={styles.itemPrice}>₹{item.price.toLocaleString("en-IN")}</p>
                                    </div>

                                    <div className={styles.controls}>
                                        <div className={styles.qtyControl}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                        </div>
                        <button className={styles.checkoutBtn} onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
