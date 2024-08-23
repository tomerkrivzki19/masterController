const express = require("express");
const productsController = require("../controllers/prdocutsController");
const router = express.Router();

// /api/v1/products -- the path

router.route("/").get(productsController.getProductsTest);
module.exports = router;
