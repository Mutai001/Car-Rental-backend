"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const hono_1 = require("hono");
const vehicles_controller_1 = require("./vehicles.controller");
//  import { adminRoleAuth, bothRoleAuth } from '../middlewares/auth.middlewares';
exports.vehicleRouter = new hono_1.Hono();
exports.vehicleRouter
    .get("vehicles", 
// bothRoleAuth,
vehicles_controller_1.getAllVehiclesController)
    .get("vehicles/:id", 
//  bothRoleAuth,
vehicles_controller_1.getVehicleByIdController)
    .post("vehicles", 
//  adminRoleAuth,
vehicles_controller_1.createVehicleController)
    .put("vehicles/:id", 
// adminRoleAuth,
vehicles_controller_1.updateVehicleController)
    .delete("vehicles/:id", 
// adminRoleAuth, 
vehicles_controller_1.deleteVehicleController);
exports.default = exports.vehicleRouter;
