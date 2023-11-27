// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");
const invValidate = require("../utilities/inventory-validation");

// Route to inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to management view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to add inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

router.post(
	"/add-classification",
	invValidate.addClassificationRules(),
	invValidate.checkAddClassificationData,
	utilities.handleErrors(invController.AddClassification)
);

router.post(
	"/add-inventory",
	invValidate.addInventoryRules(),
	invValidate.checkAddInventoryData,
	utilities.handleErrors(invController.addInventory)
);

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build specific inventory item detail
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetailedView));

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;