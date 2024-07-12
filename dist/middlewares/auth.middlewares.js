"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bothRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
const jwt_1 = require("hono/jwt");
// AUTHENTICATION MIDDLEWARE
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        console.log("Decoded Token:", decoded); // Debugging statement
        return decoded;
    }
    catch (error) {
        console.error("Token verification error:", error); // Debugging statement
        return null;
    }
};
exports.verifyToken = verifyToken;
// AUTHORIZATION MIDDLEWARE
const authMiddleware = async (c, next, requiredRole) => {
    const token = c.req.header("Authorization");
    if (!token) {
        console.error("Token is required"); // Debugging statement
        return c.json({ error: "Token is required" }, 401);
    }
    const decoded = await (0, exports.verifyToken)(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    if (!decoded) {
        console.error("Invalid token"); // Debugging statement
        return c.json({ error: "Invalid token" }, 401);
    }
    if (requiredRole === "both") {
        if (decoded.role === "admin" || decoded.role === "user") {
            c.req.user = decoded;
            return next();
        }
    }
    else if (decoded.role === requiredRole) {
        c.req.user = decoded;
        return next();
    }
    console.error("Unauthorized access attempt"); // Debugging statement
    return c.json({ error: "Unauthorized" }, 401);
};
exports.authMiddleware = authMiddleware;
const adminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.adminRoleAuth = adminRoleAuth;
const userRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.userRoleAuth = userRoleAuth;
const bothRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "both");
exports.bothRoleAuth = bothRoleAuth;
