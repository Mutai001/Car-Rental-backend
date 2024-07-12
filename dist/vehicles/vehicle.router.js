"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const hono_1 = require("hono");
const vehicles_controller_1 = require("./vehicles.controller");
exports.vehicleRouter = new hono_1.Hono();
exports.vehicleRouter
    .get("vehicles", vehicles_controller_1.getAllVehiclesController)
    .get("vehicles/:id", vehicles_controller_1.getVehicleByIdController)
    .post("vehicles", vehicles_controller_1.createVehicleController)
    .put("vehicles/:id", vehicles_controller_1.updateVehicleController)
    .delete("vehicles/:id", vehicles_controller_1.deleteVehicleController);
exports.default = exports.vehicleRouter;
