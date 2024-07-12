"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getUsersService = void 0;
// user.service.ts
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// GET ALL USERS
const getUsersService = async () => {
    const users = await db_1.db.query.UsersTable.findMany();
    return users;
};
exports.getUsersService = getUsersService;
// GET USER BY ID
const getUserByIdService = async (id) => {
    const user = await db_1.db.query.UsersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.UsersTable.user_id, id)
    });
    return user;
};
exports.getUserByIdService = getUserByIdService;
// CREATE USER
const createUserService = async (user) => {
    await db_1.db.insert(schema_1.UsersTable).values(user);
    return "User created successfully";
};
exports.createUserService = createUserService;
// UPDATE USER
const updateUserService = async (id, user) => {
    await db_1.db.update(schema_1.UsersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.UsersTable.user_id, id));
    return "User updated successfully";
};
exports.updateUserService = updateUserService;
// DELETE USER
const deleteUserService = async (id) => {
    await db_1.db.delete(schema_1.UsersTable).where((0, drizzle_orm_1.eq)(schema_1.UsersTable.user_id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
