/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const env = require('dotenv').config();
const app = express();
const static = require('./routes/static');
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities/index");

/* ***********************
 * View Engine and Templates
 *************************/
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout'); // Not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);

// Index Route
app.get("/", baseController.buildHome);

// Inventory Routes
app.use("/inv", inventoryRoute);

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
	let nav = await utilities.getNav();
	console.error(`Error at: "${req.originalUrl}": ${err.message}`);
	res.render("errors/error", {
		title: err.status || 'Server Error',
		message: err.message,
		nav
	});
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
	console.log(`app listening on ${host}:${port}`);
});
