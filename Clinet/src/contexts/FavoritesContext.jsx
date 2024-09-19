import React, { createContext, useContext, useEffect, useState } from "react";
import { cartContext } from "./CartContext";

export const FavoriteContext = createContext();

function FavoritesContext({ children }) {
  const { addToCart } = useContext(cartContext);
  const [favoritesIds, setFavoritesIds] = useState([]);

  // Load favoritesIDs from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesIds(storedFavorites);
  }, []);

  //FUNCTIONS + integration with google analytics
  // Add to favorites and send event to Google Analytics
  const addToFavorites = (productId, productName) => {
    let updatedFavorites = [...favoritesIds];

    // Check if the product is already in favorites
    if (!updatedFavorites.includes(productId)) {
      updatedFavorites.push(productId);
      setFavoritesIds(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      // Google Analytics event for adding to favorites
      window.gtag("event", "add_to_favorites", {
        event_category: "Favorites",
        event_label: productName,
        value: productId,
      });
    }
  };

  // Remove from favorites and send event to Google Analytics
  const removeFromFavorites = (productId, productName) => {
    let updatedFavorites = favoritesIds.filter((id) => id !== productId);
    setFavoritesIds(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Google Analytics event for removing from favorites
    window.gtag("event", "remove_from_favorites", {
      event_category: "Favorites",
      event_label: productName,
      value: productId,
    });
  };

  // Remove from favorites when added to cart and send event to Google Analytics
  const removeFromFavoritesOnAddToCart = async (
    variantId,
    productId,
    productName
  ) => {
    try {
      await addToCart(variantId, 1);

      let updatedFavorites = favoritesIds.filter((id) => id !== productId);
      setFavoritesIds(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      // Log the removal action to the console
      console.log(
        `Product ${productId} removed from favorites and added to cart`
      );

      // Google Analytics event for removing from favorites when added to cart
      window.gtag("event", "remove_from_favorites_on_add_to_cart", {
        event_category: "Favorites",
        event_label: productName,
        value: productId,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        productIds: favoritesIds,
        addToFavorites,
        removeFromFavorites,
        removeFromFavoritesOnAddToCart,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoritesContext;
