const express = require("express");
const clientController = require("../controllers/clinentsContoller");

const router = express.Router();

router.route("/create-customer").post(clientController.createCustomer);
// router.route("/get-customers").get(clientController.getCustomers); //need to secure in feauture !TODO:

module.exports = router;
