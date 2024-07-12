"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const auth_controller_1 = require("./auth.controller");
const authServiceValiator_1 = require("../validators/authServiceValiator");
exports.authRouter = new hono_1.Hono();
exports.authRouter.post('/register', (0, zod_validator_1.zValidator)('json', authServiceValiator_1.registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.registerUser);
exports.authRouter.post('/login', (0, zod_validator_1.zValidator)('json', authServiceValiator_1.loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.loginUserData);
