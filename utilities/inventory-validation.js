const {body, validationResult} = require("express-validator");
const utilities = require(".");
const validate = {};
const invCont = require("../controllers/invController");

validate.addClassificationRules = () => {
    return [
        body("classification_name")
            .trim()
            .isLength({min: 1})
            .withMessage("Provide a correct classification name"),
    ];
};

validate.checkAddClassificationData = async (req, res, next) => {
    const {classification_name} = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        res.render("inventory/add-classification", {
            errors,
            title: "Add New Classification",
            nav,
            classification_name,
        });
        return;
    }
    next();
};

// For stickiness for add new inventory
validate.checkAddInventoryData = async (req, res, next) => {
    const {
        inv_make,
        inv_model,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        inv_description,
    } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        let options = await invCont.buildOptions();
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Inventory",
            nav,
            inv_make,
            inv_model,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
            inv_description,
            options,
        });
        return;
    }
    next();
};

// For stickiness for add new inventory
validate.checkUpdateInventoryData = async (req, res, next) => {
    const {
        inv_id,
        inv_make,
        inv_model,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        inv_description,
    } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        let options = await invCont.buildOptions();
        res.render("inventory/edit-inventory", {
            errors,
            title: `${inv_make} ${inv_model}`,
            inv_id,
            nav,
            inv_make,
            inv_model,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
            inv_description,
            options,
        });
        return;
    }
    next();
};

validate.addInventoryRules = () => {
    return [
        // firstname is required and must be string
        body("inv_make")
            .trim()
            .isLength({min: 3})
            .withMessage("Please provide a make."), // on error this message is sent.

        // lastname is required and must be string
        body("inv_model")
            .trim()
            .isLength({min: 3})
            .withMessage("Please provide a model."), // on error this message is sent.

        body("inv_price")
            .trim()
            .isLength({min: 1})
            .withMessage("Please provide a price."), // on error this message is sent.

        body("inv_year")
            .trim()
            .isLength({min: 4, max: 4})
            .withMessage("Please provide a 4 digit year."), // on error this message is sent.

        body("inv_miles")
            .trim()
            .isLength({min: 1})
            .withMessage("Please provide a mileage."), // on error this message is sent.

        body("inv_color")
            .trim()
            .isLength({min: 1})
            .withMessage("Please provide a color."), // on error this message is sent.

        body("inv_description")
            .trim()
            .isLength({min: 1})
            .withMessage("Please provide a description."), // on error this message is sent.

    ];
};

module.exports = validate;