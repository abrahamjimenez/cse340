const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountsController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to build login page in account
router.get("/login", utilities.handleErrors(accountsController.buildLogin));

// Route to build register page in account
router.get("/register", utilities.handleErrors(accountsController.buildRegister));

// Process the registration data
router.post(
	"/register",
	regValidate.registrationRules(),
	regValidate.checkRegData,
	utilities.handleErrors(accountsController.registerAccount)
);

module.exports = router;