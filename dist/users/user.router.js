"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// user.router.ts
const hono_1 = require("hono");
const User_Controller_1 = require("./User.Controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.userRouter = new hono_1.Hono();
// GET ALL USERS - accessible by users and admins
exports.userRouter
    .get("users", User_Controller_1.getUsersController)
    .post("users", /* adminRoleAuth,*/ (0, zod_validator_1.zValidator)('json', validator_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), User_Controller_1.createUserController);
// GET USER BY ID - accessible by both users and admins
exports.userRouter
    .get("users/:id", User_Controller_1.getUserByIdController)
    .put("users/:id", (0, zod_validator_1.zValidator)('json', validator_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), User_Controller_1.updateUserController)
    // Restrict DELETE route to admins only
    .delete("users/:id", User_Controller_1.deleteUserController);
exports.default = exports.userRouter;
