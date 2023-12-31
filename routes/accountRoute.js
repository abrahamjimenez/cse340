const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountsController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to build login page in account
router.get(
    "/login",
    utilities.handleErrors(accountsController.buildLogin),
);

// Route to build register page in account
router.get("/register",
    utilities.handleErrors(accountsController.buildRegister),
);

// Default route for accounts
router.get("/",
    utilities.checkLogin,
    utilities.handleErrors(accountsController.buildAccount));

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountsController.registerAccount),
);

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLogData,
    utilities.handleErrors(accountsController.accountLogin),
);

router.get(
    "/logout",
    utilities.handleErrors(accountsController.accountLogout),
);

router.get(
    "/update/:accountId",
    utilities.handleErrors(accountsController.updateAccount),
);

router.post(
    "/update/accountInfo",
    regValidate.updateAccountInfoRules(),
    regValidate.checkUpdateAccountInfoData,
    utilities.handleErrors(accountsController.updateAccountInfo),
);

router.post(
    "/update/accountPassword",
    regValidate.updateAccountPasswordRules(),
    regValidate.checkUpdateAccountPasswordData,
    utilities.handleErrors(accountsController.updateAccountPassword)
);

module.exports = router;