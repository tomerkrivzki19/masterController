import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  getCartData,
  addToCart,
  removeProductFromCart,
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
  useLayoutEffect(() => {
    fetchCart();
  }, []);

  const subTotal = cart.reduce(
    (acc, item) => acc + item.variant.price.amount * item.quantity,
    0
  );

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
  const handleRemoveItem = async (lineItemId) => {
    // Optimistically remove the item from the state
    const updatedCartItems = cart.filter((item) => item.id !== lineItemId);
    setCart(updatedCartItems);

    try {
      await removeProductFromCart(lineItemId);
      const updatedCart = await getCartData(); // Fetch updated cart data
      setCart(updatedCart); // Update state to re-render component
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: addToCartHandler,
        addProductCartLoading,
        loading,
        subTotal,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};