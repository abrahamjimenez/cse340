// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");
const invValidate = require("../utilities/inventory-validation");

router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to management view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

router.post(
	"/add-classification",
	invValidate.addClassificationRules(),
	invValidate.checkAddClassificationData,
	utilities.handleErrors(invController.AddClassification)
);

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build specific inventory item detail
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetailedView));

module.exports = router;