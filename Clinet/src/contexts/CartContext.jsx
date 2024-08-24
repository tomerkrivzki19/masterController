import React, { createContext, useState, useEffect } from "react";
import { getCartData, addToCart } from "../services/shopify"; // Adjust the import path as necessary

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addProductCartLoading, setAddProductCartLoading] = useState(false);
  // Fetch cart data and set state
  const fetchCart = async () => {
    try {
      const fetchedCart = await getCartData();
      setCart(fetchedCart || []);
    } catch (error) {
      console.error("Error loading cart data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to add item to cart and update state
  const addToCartHandler = async (variantId, quantity) => {
    setAddProductCartLoading(true); // start loading
    try {
      await addToCart(variantId, quantity);
      await fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error adding to cart", error);
    } finally {
      setAddProductCartLoading(false); // End loading
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: addToCartHandler,
        addProductCartLoading,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
