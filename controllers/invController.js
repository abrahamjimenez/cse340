const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const accountModel = require("../models/account-model");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    });
};

/* ***************************
 *  Build detailed view
 * ************************** */
invCont.buildDetailedView = async function (req, res, next) {
    const inv_id = req.params.invId;
    const data = await invModel.getDetailedView(inv_id);
    const grid = await utilities.buildDetailedGrid(data);
    let nav = await utilities.getNav();

    const invMake = data[0].inv_make;
    const invModelData = data[0].inv_model;
    const invYear = data[0].inv_year;

    res.render("./inventory/details", {
        title: `${invMake} ${invModelData} ${invYear}`,
        nav,
        grid,
    });
};

invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav();
    let options = await invCont.buildOptions();
    res.render("./inventory/management", {
        title: "Management",
        nav,
        errors: null,
        options
    });
};

invCont.AddClassification = async function (req, res, next) {
    const {
        classification_name,
    } = req.body;

    const addResult = await invModel.addNavigationItem(
        classification_name
    );

    if (addResult) {
        req.flash(
            "notice",
            `Congratulations, ${classification_name} has been added.`
        );
        let nav = await utilities.getNav();
        res.status(201).render("inventory/management", {
            title: "Management",
            nav,
            errors: null,
        });
    } else {
        let nav = await utilities.getNav();
        req.flash("notice", "Sorry, the add failed.");
        res.status(501).render("inventory/management", {
            title: "Management",
            nav,
            errors: null,
        });
    }
};

invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    });
};

invCont.buildAddInventory = async function (req, res, next) {
    let nav = await utilities.getNav();
    let options = await invCont.buildOptions();
    res.render("inventory/add-inventory", {
        title: "Add New Inventory",
        nav,
        errors: null,
        options
    });
};

// Build the options for the classification select
invCont.buildOptions = async function (req, res, next) {
    let data = await invModel.getClassifications();
    let options = "";
    data.rows.forEach((row) => {
        options += `<option value="${row.classification_id}">${row.classification_name}</option>`;
    });
    return options;
};

invCont.addInventory = async function (req, res, next) {

    const {
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    } = req.body;

    const addResult = await invModel.addInventoryItem(
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    );

    if (addResult) {
        req.flash(
            "notice",
            `Congratulations, ${inv_make} has been added.`
        );
        let nav = await utilities.getNav();
        res.status(201).render("inventory/management", {
            title: "Management",
            nav,
            errors: null,
        });
    } else {
        let nav = await utilities.getNav();
        req.flash("notice", "Sorry, the add failed.");
        res.status(501).render("inventory/classification", {
            title: "Login",
            nav,
            errors: null,
        });
    }
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const invData = await invModel.getInventoryByClassificationId(classification_id)
    if (invData[0].inv_id) {
        return res.json(invData)
    } else {
        next(new Error("No data returned"))
    }
}

// Edit inventory view
invCont.buildEditInventory = async (req, res, next) => {
    const inventoryId = parseInt(req.params.inventoryId);
    let nav = await utilities.getNav();
    const data = await invModel.getInventoryByClassificationId(inventoryId);
    const options = await invCont.buildOptions(data.classification_id)
    const name = ` ${data && data.length > 0 && data[0].inv_make ? data[0].inv_make : ''} ${data && data.length > 0 && data[0].inv_model ? data[0].inv_model : ''}`;
    res.render("inventory/edit-inventory", {
        title: "Edit " + name,
        nav,
        options: options,
        errors: null,
        inv_id: data && data.inv_id ? data.inv_id : (data[0] ? data[0].inv_id : ''),
        inv_make: data && data.inv_make ? data.inv_make : (data[0] ? data[0].inv_make : ''),
        inv_model: data && data.inv_model ? data.inv_model : (data[0] ? data[0].inv_model : ''),
        inv_year: data && data.inv_year ? data.inv_year : (data[0] ? data[0].inv_year : ''),
        inv_description: data && data.inv_description ? data.inv_description : (data[0] ? data[0].inv_description : ''),
        inv_image: data && data.inv_image ? data.inv_image : (data[0] ? data[0].inv_image : ''),
        inv_thumbnail: data && data.inv_thumbnail ? data.inv_thumbnail : (data[0] ? data[0].inv_thumbnail : ''),
        inv_price: data && data.inv_price ? data.inv_price : (data[0] ? data[0].inv_price : ''),
        inv_miles: data && data.inv_miles ? data.inv_miles : (data[0] ? data[0].inv_miles : ''),
        inv_color: data && data.inv_color ? data.inv_color : (data[0] ? data[0].inv_color : ''),
        classification_id: data && data.classification_id ? data.classification_id : (data[0] ? data[0].classification_id : '')
    });
}

module.exports = invCont;