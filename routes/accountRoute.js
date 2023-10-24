const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountsController = require("../controllers/accountController");

// Route to build login page in account
router.get("/login", utilities.handleErrors(accountsController.buildLogin));

module.exports = router;