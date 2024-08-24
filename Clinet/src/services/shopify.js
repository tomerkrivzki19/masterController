import axios from "axios";
import Client from "shopify-buy";

// Initialize Shopify client
const client = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

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
    // For demo purposes, sorting by `title` here (not actual sales data)
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

//add to cart
export const addToCart = async (variantId, quantity) => {
  try {
    // Fetch the current cart or create a new one
    let checkout = await client.checkout.create();

    // Add item to cart
    const lineItems = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    checkout = await client.checkout.addLineItems(checkout.id, lineItems);

    // Return the updated checkout (cart) information
    return checkout;
  } catch (error) {
    console.error("Error adding item to cart", error);
    throw error;
  }
};
