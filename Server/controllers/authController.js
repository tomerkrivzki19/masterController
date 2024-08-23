const { shopify } = require("../services/shopifyService");

//only for testing
exports.shopifyAuthMiddleware = async (req, res, next) => {
  // Check if the session contains Shopify access token
  if (
    !req.session ||
    !req.session.shopify ||
    !req.session.shopify.accessToken
  ) {
    // Redirect to Shopify authentication if access token is missing
    return res.redirect(
      `/shopify/auth?shop=${req.query.shop || req.headers.host}`
    );
  }

  // Set up Shopify client with the access token
  req.shopifyClient = new shopify.clients.Rest({
    session: {
      accessToken: req.session.shopify.accessToken,
      shop: req.session.shopify.shop,
    },
    apiVersion: "2024-04", // Adjust API version as needed
  });

  next();
};

exports.OAuthProgress = async (req, res) => {
  const shop = req.query.shop;
  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  const authRoute = await shopify.auth.begin({
    shop,
    callbackPath: "/shopify/auth/callback",
    isOnline: false,
  });

  res.redirect(authRoute);
};

exports.OAuthCallback = async (req, res) => {
  try {
    const session = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    console.log("OAuth Session:", session);

    req.session.shopify = {
      accessToken: session.accessToken,
      shop: session.shop,
    };

    res.redirect("/"); // Redirect to your app's main page after authentication
  } catch (error) {
    console.error("Error during Shopify OAuth callback:", error);
    res.status(500).send("Authentication failed");
  }
};
