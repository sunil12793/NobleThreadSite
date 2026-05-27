import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));

  const persist = (next) => {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = items.find((i) => i.product === product._id);
    const next = existing
      ? items.map((i) =>
          i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i
        )
      : [
          ...items,
          {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.discountPrice || product.price,
            quantity
          }
        ];
    persist(next);
  };

  const removeFromCart = (id) => {
    persist(items.filter((i) => i.product !== id));
  };

  const clearCart = () => persist([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
