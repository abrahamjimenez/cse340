const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
	const nav = await utilities.getNav();
	res.render("index", {title: "Home", nav});
};

// Build the 500 view
baseController.build500 = async function (req, res) {
	// Throw 500 error
	throw new Error("Intentional Error");
};

module.exports = baseController;