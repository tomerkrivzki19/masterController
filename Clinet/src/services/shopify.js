import axios from "axios";
import Client from "shopify-buy";

//SERVER INTEGRATION FOR SOPIFY
// Initialize Shopify client
const client = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Helper function to get the cart token from cookies
const getCartTokenFromCookie = () => {
  const name = "shopifyCartToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

// Helper function to store the cart token in cookies
const storeCartTokenInCookie = (token) => {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `shopifyCartToken=${token}; path=/; expires=${expires}`;
};

// Create or retrieve a checkout session
const getCheckout = async () => {
  let cartToken = getCartTokenFromCookie();
  let checkout;

  if (cartToken) {
    try {
      // Fetch the existing checkout if a cart token exists
      checkout = await client.checkout.fetch(cartToken);
    } catch (error) {
      console.error("Error fetching checkout:", error);
      checkout = null;
    }
  }

  if (!checkout || checkout.completedAt) {
    // If no valid checkout exists, create a new one
    checkout = await client.checkout.create();
    storeCartTokenInCookie(checkout.id);
  }

  return checkout.id;
};

//get all products
export const fetchProducts = async () => {
  try {
    const products = await client.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

//get top -5 products
export const fetchTopSellingProducts = async () => {
  try {
    // Fetch all products
    const products = await client.product.fetchAll();

    // Sort products by a sales-related property if available (example: total sales)
    // You would need to adapt this if you have sales data available
    // For demo purposes, sorting by `title` here (not actual sales data)TODO:
    const sortedProducts = products.sort((a, b) =>
      b.title.localeCompare(a.title)
    );

    // Limit to top 5 products
    const topSellingProducts = sortedProducts.slice(0, 5);

    return topSellingProducts;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

// fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const product = await client.product.fetch(id);
    return product;
  } catch (error) {
    console.error("Error fetching product by ID", error);
    throw error;
  }
};

//add to cart via shopify + cookies
// Add item to cart
export const addToCart = async (variantId, quantity) => {
  try {
    const checkoutId = await getCheckout();

    const lineItems = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    // Ensure `checkoutId` is valid before proceeding
    if (!checkoutId) {
      throw new Error("Invalid checkout ID");
    }

    const updatedCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItems
    );

    return updatedCheckout;
  } catch (error) {
    console.error("Error adding item to cart", error);
    throw error;
  }
};

// Retrieve cart data
export const getCartData = async () => {
  try {
    const checkoutId = await getCheckout();
    const checkout = await client.checkout.fetch(checkoutId);
    return checkout.lineItems || [];
  } catch (error) {
    console.error("Error fetching cart data", error);
    throw error;
  }
};

// Update item quantity in the cart (increase or decrease)
const updateCartItemQuantity = async (lineItemId, quantity) => {
  try {
    const checkoutId = await getCheckout();

    if (!checkoutId) {
      throw new Error("Invalid checkout ID");
    }

    if (quantity < 1) {
      throw new Error("Quantity cannot be less than 1");
    }

    const updatedCheckout = await client.checkout.updateLineItems(checkoutId, [
      {
        id: lineItemId,
        quantity: parseInt(quantity, 10),
      },
    ]);

    return updatedCheckout;
  } catch (error) {
    console.error("Error updating item quantity in cart", error);
    throw error;
  }
};

// Increase item quantity
export const increaseItemQuantity = async (lineItemId, currentQuantity) => {
  return updateCartItemQuantity(lineItemId, currentQuantity + 1);
};

// Decrease item quantity
export const decreaseItemQuantity = async (lineItemId, currentQuantity) => {
  if (currentQuantity > 1) {
    return updateCartItemQuantity(lineItemId, currentQuantity - 1);
  } else {
    throw new Error("Quantity cannot be less than 1");
  }
};

// Clear the cart token from cookies
export const clearCartTokenCookie = () => {
  document.cookie =
    "shopifyCartToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
