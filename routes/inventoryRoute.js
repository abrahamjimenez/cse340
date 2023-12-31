// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");
const invValidate = require("../utilities/inventory-validation");
const invCont = require("../controllers/invController");

// Route to inventory management view
router.get(
    "/",
    utilities.handleErrors(invController.buildManagement)
);

// Route to inv/edit/#
router.get(
    "/edit/:inventoryId",
    invCont.checkAdmin,
    utilities.handleErrors(invController.buildEditInventory)
);

// Route to inv/delete/#
router.get(
    "/delete/:inventoryId",
    invCont.checkAdmin,
    utilities.handleErrors(invController.buildDeleteInventory)
);

router.delete(
    "/delete",
    utilities.handleErrors(invController.deleteInventoryItem)
)

// Route to management view
router.get(
    "/add-classification",
    invCont.checkAdmin,
    utilities.handleErrors(invController.buildAddClassification)
);

// Route to add inventory
router.get(
    "/add-inventory",
    invCont.checkAdmin, utilities.handleErrors(invController.buildAddInventory)
);

router.post(
    "/add-classification",
    invCont.checkAdmin,
    invValidate.addClassificationRules(),
    invValidate.checkAddClassificationData,
    utilities.handleErrors(invController.AddClassification),
);

router.post(
    "/add-inventory",
    invCont.checkAdmin,
    invValidate.addInventoryRules(),
    invValidate.checkAddInventoryData,
    utilities.handleErrors(invController.addInventory),
);

// Edit inventory post
router.post(
    "/update/",
    invCont.checkAdmin,
    invValidate.addInventoryRules(),
    invValidate.checkUpdateInventoryData,
    utilities.handleErrors(invController.updateInventory),
);

// Route to build inventory by classification view
router.get(
    "/type/:classificationId",
    utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build specific inventory item detail
router.get(
    "/detail/:invId",
    utilities.handleErrors(invController.buildDetailedView)
);

router.get(
    "/getInventory/:classification_id",
    utilities.handleErrors(invController.getInventoryJSON)
);

module.exports = router;