"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const auth_service_1 = require("./auth.service");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
;
// Register user
const signup = async (c) => {
    try {
        const { full_name, email, contact_phone, address, username, password } = await c.req.json();
        // Check if user already exists
        const existingUser = await (0, auth_service_1.userLoginService)(username);
        if (existingUser) {
            return c.json({ error: "User already exists" }, 400);
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Insert into UsersTable
        const newUser = await db_1.db.insert(schema_1.UsersTable).values({
            full_name,
            email,
            contact_phone,
            address,
        }).returning({ user_id: schema_1.UsersTable.user_id }).execute();
        if (newUser.length === 0) {
            return c.json({ error: "Failed to create user" }, 400);
        }
        const userId = newUser[0].user_id;
        // Create user in AuthOnUsersTable
        const createUser = await (0, auth_service_1.createAuthUserService)({
            user_id: userId,
            username,
            email,
            password: hashedPassword,
        });
        if (!createUser) {
            return c.json({ error: "User not created" }, 400);
        }
        return c.json({ message: "User created successfully" }, 201);
    }
    catch (error) {
        console.error("Signup error:", error);
        return c.json({ error: "Failed to create user" }, 500);
    }
};
exports.signup = signup;
// Login user
const loginUser = async (c) => {
    try {
        const { username, password } = await c.req.json();
        // Check if user exists
        const user = await (0, auth_service_1.userLoginService)(username);
        if (!user) {
            return c.json({ error: "Invalid credentials" }, 401);
        }
        // Compare passwords
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return c.json({ error: "Invalid credentials" }, 401);
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return c.json({ message: "Login successful", token, user }, 200);
    }
    catch (error) {
        console.error("Login error:", error);
        return c.json({ error: "Failed to login" }, 500);
    }
};
exports.loginUser = loginUser;
