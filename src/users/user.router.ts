import { Hono } from "hono";
import { createUsersData, deleteUsersData, getAllUsersData, getOneUsersData,  updateUsersData } from "./user.contreller";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminRoleAuth, userOrAdminRoleAuth, userRoleAuth } from "../middleware/bearAuth";



export const UserRouter = new Hono();
UserRouter.get("/users", getAllUsersData);
UserRouter.get("/users/:id", getOneUsersData);
UserRouter.post("/users", createUsersData);
UserRouter.delete("/users/:id", userOrAdminRoleAuth,deleteUsersData);
UserRouter.put("/users/:id",userOrAdminRoleAuth, updateUsersData);



















// export const UserRouter = new Hono();
// UserRouter.get("/users",adminRoleAuth, getAllUsersData);
// UserRouter.get("/users/:id", userRoleAuth, getOneUsersData);
// UserRouter.post("/users", zValidator('json', userSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }),createUsersData);
// UserRouter.delete("/users/:id", deleteUsersData);
// UserRouter.put("/users/:id", updateUsersData);
