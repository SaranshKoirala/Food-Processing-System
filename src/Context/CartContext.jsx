import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const addToCart = (item) => {
    setCartItem((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (prevProduct) => prevProduct.id === item.id
      );

      let discountedPrice = item.price;
      let quantityToAdd = 1;
      let freeQuantity = 0;

      // Check for offers
      if (item.offers.length > 0) {
        const offer = item.offers[0];

        if (offer.offer_kind === 'percentage') {
          discountedPrice = item.price - (item.price * offer.value) / 100;
        } else if (offer.offer_kind === 'buy_x_get_y') {
          // Store offer info for later calculation
          // Don't add free items yet - wait until buy_quantity is reached
        }
      }

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[existingItemIndex];

        // Check if buy_x_get_y offer applies
        if (
          item.offers.length > 0 &&
          item.offers[0].offer_kind === 'buy_x_get_y'
        ) {
          const offer = item.offers[0];
          const newQuantity = currentItem.quantity + 1;

          // Calculate how many free items user should get
          const setsCompleted = Math.floor(newQuantity / offer.buy_quantity);
          freeQuantity = setsCompleted * offer.get_quantity;

          updatedCart[existingItemIndex].quantity = newQuantity;
          updatedCart[existingItemIndex].freeQuantity = freeQuantity;
        } else {
          updatedCart[existingItemIndex].quantity += 1;
        }

        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            ...item,
            discountedPrice,
            quantity: quantityToAdd,
            freeQuantity: 0,
            offer: item.offers[0] || null,
          },
        ];
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

  const increaseQuantity = (itemId) => {
    setCartItem((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + 1;
          let freeQuantity = 0;

          // Recalculate free quantity if buy_x_get_y offer exists
          if (
            item.offers?.length > 0 &&
            item.offers[0].offer_kind === 'buy_x_get_y'
          ) {
            const offer = item.offers[0];
            const setsCompleted = Math.floor(newQuantity / offer.buy_quantity);
            freeQuantity = setsCompleted * offer.get_quantity;
          }

          return {
            ...item,
            quantity: newQuantity,
            freeQuantity: freeQuantity,
          };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItem(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === itemId) {
              const newQuantity = item.quantity - 1;

              // Remove item if quantity becomes 0
              if (newQuantity <= 0) {
                return null;
              }

              let freeQuantity = 0;

              // Recalculate free quantity if buy_x_get_y offer exists
              if (
                item.offers?.length > 0 &&
                item.offers[0].offer_kind === 'buy_x_get_y'
              ) {
                const offer = item.offers[0];
                const setsCompleted = Math.floor(
                  newQuantity / offer.buy_quantity
                );
                freeQuantity = setsCompleted * offer.get_quantity;
              }

              return {
                ...item,
                quantity: newQuantity,
                freeQuantity: freeQuantity,
              };
            }
            return item;
          })
          .filter(Boolean) // Remove null items (when quantity became 0)
    );
  };

  const clearCart = () => setCartItem([]);

  const value = {
    orderId,
    setOrderId,
    cartItem,
    setCartItem,
    addToCart,
    removeItemFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    recommendedProducts,
    setRecommendedProducts,
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
