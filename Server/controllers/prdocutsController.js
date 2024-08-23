const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: ["read_products"], // Define the scopes you need
  hostName: process.env.HOST_NAME,
  apiVersion: LATEST_API_VERSION,
});

// Placeholder function for getting session (implement your own session retrieval logic)
const getSessionFromStorage = async (req) => {
  // Your logic to retrieve session
  // This could involve reading from a database or in-memory store
  return {
    shop: "1ac9bc-aa.myshopify.com/", // Replace with your store's domain
    accessToken: process.env.ADMIN_API_ACCESS_TOKEN, // Access token for your app
  };
};

//all clients for now
exports.getProductsTest = async (req, res) => {
  try {
    // Create a new REST client instance
    const session = await getSessionFromStorage(req); // Implement this function based on your session storage logic

    const client = new shopify.clients.Rest({
      session,
      apiVersion: LATEST_API_VERSION,
    });

    // Fetch all products
    const response = await client.get({
      path: "products",
    });

    res.json(response.body);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while fetching products.");
  }
};
