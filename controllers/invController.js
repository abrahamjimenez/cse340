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
	res.render("./inventory/management", {
		title: "Management",
		nav,
		errors: null,
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
			title: "Login",
			nav,
			errors: null,
		});
	} else {
		req.flash("notice", "Sorry, the add failed.");
		res.status(501).render("inventory/classification", {
			title: "Login",
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
		2
	);

	if (addResult) {
		req.flash(
			"notice",
			`Congratulations, ${inv_make} has been added.`
		);
		let nav = await utilities.getNav();
		res.status(201).render("inventory/management", {
			title: "Login",
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

module.exports = invCont;