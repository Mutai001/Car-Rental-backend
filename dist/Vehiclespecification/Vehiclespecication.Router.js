"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationRouter = void 0;
const hono_1 = require("hono");
const Vehiclespecication_controller_1 = require("./Vehiclespecication.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
exports.vehicleSpecificationRouter = new hono_1.Hono();
// GET ALL VEHICLE SPECIFICATIONS - accessible by users and admins
exports.vehicleSpecificationRouter
    .get("vehicle-specifications", auth_middlewares_1.userRoleAuth, Vehiclespecication_controller_1.getVehicleSpecificationsController)
    .post("vehicle-specifications", auth_middlewares_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Vehiclespecication_controller_1.createVehicleSpecificationController);
// GET VEHICLE SPECIFICATION BY ID - accessible by both users and admins
exports.vehicleSpecificationRouter
    .get("vehicle-specifications/:id", auth_middlewares_1.bothRoleAuth, Vehiclespecication_controller_1.getVehicleSpecificationByIdController)
    .put("vehicle-specifications/:id", auth_middlewares_1.adminRoleAuth, (0, zod_validator_1.zValidator)('json', validator_1.vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Vehiclespecication_controller_1.updateVehicleSpecificationController)
    // Restrict DELETE route to admins only
    .delete("vehicle-specifications/:id", auth_middlewares_1.adminRoleAuth, Vehiclespecication_controller_1.deleteVehicleSpecificationController);
exports.default = exports.vehicleSpecificationRouter;
