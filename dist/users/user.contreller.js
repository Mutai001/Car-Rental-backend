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
exports.deleteUsersData = exports.updateUsersData = exports.createUsersData = exports.getOneUsersData = exports.getAllUsersData = void 0;
const user_service_1 = require("./user.service");
const bcrypt = __importStar(require("bcrypt"));
//fetch all users
const getAllUsersData = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, user_service_1.getAllUsers)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getAllUsersData = getAllUsersData;
// fetch one user
const getOneUsersData = async (c) => {
    const id = c.req.param("id");
    const user = await (0, user_service_1.fetchOneUsers)(parseInt(id));
    if (user === undefined) {
        return c.json({ message: "No user found" }, 404);
    }
    return c.json(user, 200);
};
exports.getOneUsersData = getOneUsersData;
//create user
const createUsersData = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const response = await (0, user_service_1.CreateUser)(user);
        if (!response) {
            return c.text("User not created", 404);
        }
        return c.json({ message: response }, 201);
    }
    catch (error) {
        return c.json({ message: error?.message }, 500);
    }
};
exports.createUsersData = createUsersData;
//update user
const updateUsersData = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const user = await c.req.json();
        const User = await (0, user_service_1.UpdateUser)(id, user);
        if (!user_service_1.UpdateUser)
            return c.text('User not updated', 400);
        return c.json({ message: "User updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUsersData = updateUsersData;
//delete user
const deleteUsersData = async (c) => {
    const id = c.req.param("id");
    const response = await (0, user_service_1.DeleteUser)(parseInt(id));
    return c.json({ message: response }, 200);
};
exports.deleteUsersData = deleteUsersData;
