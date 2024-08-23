const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: ["read_products"], // Define the scopes you need
  hostName: process.env.HOST_NAME,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
});

console.log(shopify.clients);

module.exports = { shopify };
