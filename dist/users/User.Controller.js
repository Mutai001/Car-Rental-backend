"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const user_service_1 = require("./user.service");
// GET ALL USERS
const getUsersController = async (c) => {
    try {
        const users = await (0, user_service_1.getUsersService)();
        if (!users || users.length === 0) {
            return c.text("No users found", 404);
        }
        return c.json(users, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUsersController = getUsersController;
// GET USER BY ID
const getUserByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const user = await (0, user_service_1.getUserByIdService)(id);
        if (!user) {
            return c.text("User not found", 404);
        }
        return c.json(user, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUserByIdController = getUserByIdController;
// CREATE USER
const createUserController = async (c) => {
    try {
        const user = await c.req.json();
        const result = await (0, user_service_1.createUserService)(user);
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createUserController = createUserController;
// UPDATE USER
const updateUserController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const user = await c.req.json();
        const result = await (0, user_service_1.updateUserService)(id, user);
        if (result === "User updated successfully") {
            return c.json({ message: result }, 200);
        }
        else {
            return c.text(result, 400); // Handle specific error case if needed
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateUserController = updateUserController;
// DELETE USER
const deleteUserController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const result = await (0, user_service_1.deleteUserService)(id);
        if (result === "User deleted successfully") {
            return c.json({ message: result }, 200);
        }
        else {
            return c.text(result, 400); // Handle specific error case if needed
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteUserController = deleteUserController;
