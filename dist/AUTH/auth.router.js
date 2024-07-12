"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const auth_controller_1 = require("./auth.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator"); // Assuming you have a validation schema
exports.authRouter = new hono_1.Hono();
// Register user - no authentication required
exports.authRouter
    .post("signup", (0, zod_validator_1.zValidator)('json', validator_1.authSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.signup);
// Login user - no authentication required
exports.authRouter
    .post("login", (0, zod_validator_1.zValidator)('json', validator_1.authSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.loginUser);
exports.default = exports.authRouter;
