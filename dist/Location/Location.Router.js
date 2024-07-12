"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const Location_controller_1 = require("./Location.controller");
exports.locationRouter = new hono_1.Hono();
exports.locationRouter
    .get("locations", Location_controller_1.getAllLocationsController)
    .get("locations/:id", Location_controller_1.getLocationByIdController)
    .post("locations", Location_controller_1.createLocationController)
    .put("locations/:id", Location_controller_1.updateLocationController)
    .delete("locations/:id", Location_controller_1.deleteLocationController);
exports.default = exports.locationRouter;
