"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage and Validate
    useEffect(() => {
        const savedCart = localStorage.getItem("izeexo_cart");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);

                // Serialize validation to avoid race conditions or double sets if needed, 
                // but effectively we just want to check validity once on load.
                validateCartItems(parsedCart);
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const validateCartItems = async (currentCart) => {
        if (currentCart.length === 0) return;

        const itemIds = currentCart.map(item => item.id);

        try {
            const res = await fetch('/api/cart/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemIds })
            });

            if (res.ok) {
                const { validIds } = await res.json();
                // Filter out items that are no longer valid
                const validCart = currentCart.filter(item => validIds.includes(item.id));

                if (validCart.length !== currentCart.length) {
                    setCart(validCart);
                    toast.error("Some items were removed because they are no longer available.");
                }
            }
        } catch (error) {
            console.error("Error validating cart:", error);
        }
    };

    // Save to LocalStorage
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("izeexo_cart", JSON.stringify(cart));
    }, [cart, isLoaded]);

    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
            toast.success("Item quantity updated!");
            setCart((prev) =>
                prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            toast.success("Added to cart!");
            setCart((prev) => [...prev, { ...product, quantity: 1 }]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
