const invModel = require("../models/inventory-model");
const Util = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += `
			<li>
				<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>
			</li>`;
  });
  list += "</ul>";
  return list;
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
  if (data.length === 0) {
    return '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }

  const grid = data.map(vehicle => {
    const {
      inv_id,
      inv_make,
      inv_model,
      inv_thumbnail,
      inv_price,
    } = vehicle;

    return `
      <li>
        <a href="../../inv/detail/${inv_id}" title="View ${inv_make} ${inv_model} details">
          <img src="${inv_thumbnail}" alt="Image of ${inv_make} ${inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <h2>
            <a href="../../inv/detail/${inv_id}" title="View ${inv_make} ${inv_model} details">
              ${inv_make} ${inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat('en-US').format(inv_price)}</span>
          <hr />
        </div>
      </li>
    `;
  });

  return '<ul id="inv-display">' + grid.join('') + '</ul>';
};

// Build the detailed view
Util.buildDetailedGrid = async function (data) {
  if (data.length === 0) {
    return '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }

  const grid = data.map(vehicle => {
    const {
      inv_id,
      inv_make,
      inv_model,
      inv_image,
      inv_price,
      inv_description,
      inv_color,
      inv_miles,
    } = vehicle;

    return `
			<a href="../../inv/detail/${inv_id}" title="View ${inv_make} ${inv_model} details">
				<img src="${inv_image}" alt="Image of ${inv_make} ${inv_model} on CSE Motors" class="responsive" >
			</a>
			<div class="inventory--details">
				<h2>${inv_make} ${inv_model} Details</h2>
				<p><span class="inventory__bold">Price:</span> $${parseInt(inv_price).toLocaleString()}</p>
				<p><span class="inventory__bold">Description:</span> ${inv_description}</p>
				<p><span class="inventory__bold">Color:</span> ${inv_color}</p>
				<p><span class="inventory__bold">Miles:</span> ${inv_miles.toLocaleString()}</p>
			</div>
    `;
  });

  return '<section id="detailed-display">' + grid.join('') + '</section>';
};

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        res.locals.accountData = accountData;
        res.locals.loggedin = 1;
        next();
      });
  } else {
    next();
  }
};

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
* Middleware For Handling Errors
* Wrap other function in this for
* General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;