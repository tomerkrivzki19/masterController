import React, { createContext, useState, useEffect } from "react";
import {
  getCartData,
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../services/shopify"; // Adjust the import path as necessary

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

  // Function to increase item quantity and refresh cart data
  const handleIncrease = async (lineItemId, currentQuantity) => {
    try {
      await increaseItemQuantity(lineItemId, currentQuantity);
      await fetchCart(); // Refresh cart data after the update
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };
  const handleDecrease = async (lineItemId, currentQuantity) => {
    try {
      await decreaseItemQuantity(lineItemId, currentQuantity);
      await fetchCart(); // Refresh cart data after the update
    } catch (error) {
      console.error("Error decreasing item quantity", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: addToCartHandler,
        addProductCartLoading,
        loading,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
