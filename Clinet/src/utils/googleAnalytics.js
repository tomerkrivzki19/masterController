// // Add to favorites and send event to Google Analytics
// export const addToFavorites = (productId, productName) => {
//   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   console.log("add to favorites", productId, productName);

//   // Check if the product is already in favorites
//   if (!favorites.includes(productId)) {
//     favorites.push(productId);
//     localStorage.setItem("favorites", JSON.stringify(favorites));

//     // Google Analytics event for adding to favorites
//     window.gtag("event", "add_to_favorites", {
//       event_category: "Favorites",
//       event_label: productName,
//       value: productId,
//     });
//   }
// };

// // Remove from favorites and send event to Google Analytics
// export const removeFromFavorites = (productId, productName) => {
//   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//   // Check if the product is in the favorites list and remove it
//   if (favorites.includes(productId)) {
//     favorites = favorites.filter((id) => id !== productId);
//     localStorage.setItem("favorites", JSON.stringify(favorites));

//     // Google Analytics event for removing from favorites
//     window.gtag("event", "remove_from_favorites", {
//       event_category: "Favorites",
//       event_label: productName,
//       value: productId,
//     });
//   }
// };

// //create a funciton/event that will delete the item from favorites by adding the item to the cart
