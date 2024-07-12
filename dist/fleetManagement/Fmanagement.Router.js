"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRouter = void 0;
const hono_1 = require("hono");
const Fmanagement_controller_1 = require("./Fmanagement.controller");
exports.fleetManagementRouter = new hono_1.Hono();
exports.fleetManagementRouter
    .get("fleet-management", Fmanagement_controller_1.getAllFleetManagementController)
    .get("fleet-management/:id", Fmanagement_controller_1.getFleetManagementByIdController)
    .post("fleet-management", Fmanagement_controller_1.createFleetManagementController)
    .put("fleet-management/:id", Fmanagement_controller_1.updateFleetManagementController)
    .delete("fleet-management/:id", Fmanagement_controller_1.deleteFleetManagementController);
exports.default = exports.fleetManagementRouter;
