const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: ["write_customers"],
  hostName: process.env.HOST_NAME,
  apiVersion: LATEST_API_VERSION, // Set the appropriate API version
  isEmbeddedApp: false,
});
// console.log(shopify);

module.exports = { shopify };
