const AppError = require("../utils/appError");
const { LATEST_API_VERSION } = require("@shopify/shopify-api");
const axios = require("axios");

exports.createCustomer = async (req, res, next) => {
  try {
    const { email } = req.body;
    // console.log(req.body);

    if (!email) {
      return next(new AppError("Email is required", 400));
    }

    // Prepare request
    const response = await axios.post(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${LATEST_API_VERSION}/customers.json`,
      {
        customer: {
          email: email,
          first_name: email,
          last_name: "",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN,
        },
      }
    );

    res.status(201).json({
      status: "success",
      message: "The email was saved",
      customer: response.data.customer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    next(error);
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${LATEST_API_VERSION}/customers.json`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN,
        },
      }
    );

    console.log("Customers retrieved:", response.data);

    res.status(200).json({
      status: "success",
      customers: response.data.customers,
    });
  } catch (error) {
    console.error("Error retrieving customers:", error);
    next(error);
  }
};
