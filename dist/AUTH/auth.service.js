"use strict";
// auth.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthUserService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createAuthUserService = async (user) => {
    const createUser = await db_1.db.insert(schema_1.AuthOnUsersTable).values(user).returning({ user_id: schema_1.AuthOnUsersTable.user_id }).execute();
    return createUser.length > 0 ? createUser[0].user_id : null;
};
exports.createAuthUserService = createAuthUserService;
const userLoginService = async (username) => {
    const user = await db_1.db.select({
        user_id: schema_1.AuthOnUsersTable.user_id,
        username: schema_1.AuthOnUsersTable.username,
        email: schema_1.AuthOnUsersTable.email,
        password: schema_1.AuthOnUsersTable.password, // Select password for verification
        role: schema_1.AuthOnUsersTable.role
    }).from(schema_1.AuthOnUsersTable).where((0, drizzle_orm_1.eq)(schema_1.AuthOnUsersTable.username, username)).execute();
    if (user.length > 0) {
        console.log("User found: ", user[0]);
        return user[0];
    }
    else {
        console.log("User not found");
        return null;
    }
};
exports.userLoginService = userLoginService;
