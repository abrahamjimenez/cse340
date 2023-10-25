const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountsController = require("../controllers/accountController");

// Route to build login page in account
router.get("/login", utilities.handleErrors(accountsController.buildLogin));

// Route to build register page in account
router.get("/register", utilities.handleErrors(accountsController.buildRegister))

// Enable the registration route
router.post("/register", utilities.handleErrors(accountsController.registerAccount))

module.exports = router;