"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserData = exports.registerUser = void 0;
const bcrypt = __importStar(require("bcrypt"));
const auth_service_1 = require("./auth.service");
const jwt_1 = require("hono/jwt");
//register user
const registerUser = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        console.log(user);
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await (0, auth_service_1.createAuthUserService)(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUser = registerUser;
//log-in user
const loginUserData = async (c) => {
    try {
        const details = await c.req.json();
        const user = await (0, auth_service_1.loginUserService)(details);
        if (user === null) {
            console.log(user);
            return c.json({ message: "No user found" }, 404);
        }
        const userMatch = await bcrypt.compare(details.password, user?.password);
        console.log(user?.password, details.password, userMatch);
        if (!userMatch) {
            return c.json({ user: "not found" }, 200);
        }
        else {
            const payload = {
                sub: user?.username,
                role: user?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)
            };
            const secret = process.env.JWT_SECRET;
            const token = await (0, jwt_1.sign)(payload, secret);
            const UserDetails = user?.username;
            const userRole = user?.role;
            return c.json({ token, user: { userRole, ...details } }, 200);
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUserData = loginUserData;
