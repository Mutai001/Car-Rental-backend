"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
require("dotenv/config");
const node_server_1 = require("@hono/node-server");
const vehicle_router_1 = require("./Vehicles/vehicle.router");
const User_Router_1 = require("./Users/User.Router");
const Booking_Router_1 = require("./Booking/Booking.Router");
const Vehiclespecication_Router_1 = require("./Vehiclespecification/Vehiclespecication.Router");
const auth_router_1 = require("./AUTH/auth.router");
const payment_router_1 = __importDefault(require("./payment/payment.router"));
const support_Router_1 = __importDefault(require("./customersupportTicket/support.Router"));
const Fmanagement_Router_1 = __importDefault(require("./FleetManagement/Fmanagement.Router"));
const Location_Router_1 = __importDefault(require("./Location/Location.Router"));
const cors_1 = require("hono/cors");
const app = new hono_1.Hono().basePath("/api");
// Enable CORS
app.use((0, cors_1.cors)({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
}));
// Default route
app.get('/', (c) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vehicle Management API</title>
        </head>
        <body>
            <h1>Welcome to Vehicle Management API</h1>
            <p>Manage your vehicles efficiently.</p>
        </body>
        </html>
    `;
    return c.html(htmlContent);
});
// Register vehicle router
app.route("/", vehicle_router_1.vehicleRouter);
app.route("/", auth_router_1.authRouter);
app.route("/", Booking_Router_1.bookingRouter);
app.route("/", Vehiclespecication_Router_1.vehicleSpecificationRouter);
app.route("/", User_Router_1.userRouter);
app.route("/", support_Router_1.default);
app.route("/", payment_router_1.default);
app.route("/", Location_Router_1.default);
app.route("/", Fmanagement_Router_1.default);
console.log('Routes registered:', app.routes);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
// Start server
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 8000
});
console.log(`Server is running at port 8000`);
