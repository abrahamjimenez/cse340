const jwt = require("jsonwebtoken");

// Protected route middleware. Check if user is logged in
const protect = async (req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
        return res.status(401).json({message: "Unauthorized - Missing token"});
    }

    try {
        const decoded = jwt.decode(token);

        // Add accountType ro res.locals
        res.locals.accountType = decoded.account_type;

        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({message: "Unauthorized - Invalid token"});
    }
};

module.exports = {
    protect,
};
