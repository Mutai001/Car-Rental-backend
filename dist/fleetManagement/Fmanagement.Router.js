"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRouter = void 0;
const hono_1 = require("hono");
const Fmanagement_controller_1 = require("./Fmanagement.controller");
// import { adminRoleAuth } from '../middlewares/auth.middlewares';
exports.fleetManagementRouter = new hono_1.Hono();
exports.fleetManagementRouter
    .get("fleet-management", 
// adminRoleAuth,
Fmanagement_controller_1.getAllFleetManagementController)
    .get("fleet-management/:id", 
//  adminRoleAuth, 
Fmanagement_controller_1.getFleetManagementByIdController)
    .post("fleet-management", 
//  adminRoleAuth, 
Fmanagement_controller_1.createFleetManagementController)
    .put("fleet-management/:id", 
// adminRoleAuth,
Fmanagement_controller_1.updateFleetManagementController)
    .delete("fleet-management/:id", 
//  adminRoleAuth,
Fmanagement_controller_1.deleteFleetManagementController);
exports.default = exports.fleetManagementRouter;
