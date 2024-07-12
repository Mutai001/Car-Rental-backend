"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const prometheus_1 = require("@hono/prometheus");
const trailing_slash_1 = require("hono/trailing-slash");
const http_exception_1 = require("hono/http-exception");
const timeout_1 = require("hono/timeout");
// import { UserRouter } from './drizzle/users/user.router';
const auth_router_1 = require("./authentication/auth.router");
const payments_router_1 = require("./payments/payments.router");
const user_router_1 = require("./users/user.router");
const bookings_router_1 = require("./bookings/bookings.router");
const customerSupportTickets_router_1 = require("./customerSupportTickets/customerSupportTickets.router");
const fleetManagement_router_1 = require("./fleetManagement/fleetManagement.router");
const locations_router_1 = require("./locations/locations.router");
const vehicles_router_1 = require("./vehicles/vehicles.router");
const vehicleSpecifications_router_1 = require("./vehicleSpecifications/vehicleSpecifications.router");
const app = new hono_1.Hono().basePath('/api');
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// inbuilt middlewares
app.use((0, logger_1.logger)());
app.use((0, csrf_1.csrf)());
app.use((0, trailing_slash_1.trimTrailingSlash)());
app.use('*', registerMetrics);
app.use('/', (0, timeout_1.timeout)(10000, customTimeoutException));
app.use('*', registerMetrics);
app.get('/ok', (c) => {
    return c.text('The server is running☑️');
});
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
app.get('/metrics', printMetrics);
// Routes
app.route('/', user_router_1.UserRouter); // api/users
app.route('/', auth_router_1.authRouter); // api/auth/register or api/auth/login
app.route('/', payments_router_1.paymentsRouter); // api/payments
app.route('/', bookings_router_1.bookingsRouter); // api/bookings
app.route('/', customerSupportTickets_router_1.customerSupportTicketsRouter); // api/customerSupportTickets
app.route('/', fleetManagement_router_1.fleetManagementRouter); // api/fleetManagement
app.route('/', locations_router_1.locationsRouter); // api/locations
app.route('/', payments_router_1.paymentsRouter); // api/payments
app.route('/', vehicles_router_1.vehiclesRouter); // api/vehicles
app.route('/', vehicleSpecifications_router_1.vehicleSpecificationsRouter); // api/vehicleSpecifications
// default route
app.get('/', (c) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restaurant API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    header {
      background-color: #333;
      color: white;
      padding: 1rem 0;
      text-align: center;
    }
    main {
      padding: 2rem;
      max-width: 800px;
      margin: 2rem auto;
      background-color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem 0;
      position: absolute;
      width: 100%;
      bottom: 0;
    }
    h1 {
      color: #333;
    }
    p {
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to Our Car Rental API</h1>
  </header>
  <main>
    <h1>Hello, I am Cyrus Kimutai 😊</h1>

    <p>Welcome to our  Car Rental API. Here you can find a variety of services to manage your car rental data.</p>
  </main>
  <footer>
    <p>&copy; 2024  Car Rental API. All rights reserved.</p>
  </footer>
</body>
</html>
  `;
    return c.html(html);
});
// const port = 5000 
const port = Number(process.env.PORT);
console.log(`Server is running on port ${process.env.PORT}`);
app.get('/metrics', printMetrics);
console.log('Registered routes: ', app.routes);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 5000,
});
