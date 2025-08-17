import { createContext, useState, useEffect } from 'react';
import { calcularSubtotal, calcularShipping, calcularTotal } from '../utils/cartUtils';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = sessionStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      // Always use 'image' property for cart items
      const normalizedProduct = {
        ...product,
        image: product.image || product.img || '',
      };
      const existing = prev.find(item => item.id === normalizedProduct.id);
      if (existing) {
        return prev.map(item =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        return [...prev, { ...normalizedProduct, quantity }];
      }
    });
  };

  const removeFromCart = (indexToRemove) => {
    setItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const increaseQuantity = (productId) => {
    setItems((prev) => prev.map(item =>
      item.id === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setItems((prev) => prev.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const clearCart = () => setItems([]);

  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const subtotal = calcularSubtotal(items);
  const shipping = calcularShipping(items);
  const total = calcularTotal(items);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, subtotal, shipping, total, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
