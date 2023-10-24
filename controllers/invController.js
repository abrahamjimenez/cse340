const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

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

module.exports = invCont;