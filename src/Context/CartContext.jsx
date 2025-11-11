import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (item) => {
    setCartItem((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (prevProduct) => prevProduct.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...cartItem];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...cartItem, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (productId) => {
    setCartItem((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(productId);
      return;
    }
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => setCartItem([]);

  const value = {
    cartItem,
    setCartItem,
    addToCart,
    removeItemFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
