import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { number } from 'zod'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { prometheus } from '@hono/prometheus'
import { html, raw } from 'hono/html'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { HTTPException } from 'hono/http-exception'
import { timeout } from 'hono/timeout'

// import { UserRouter } from './drizzle/users/user.router';
import { authRouter } from './authentication/auth.router'
import { paymentsRouter } from './payments/payments.router'
import { UserRouter } from './users/user.router'
import { bookingsRouter } from './bookings/bookings.router'
import { customerSupportTicketsRouter } from './customerSupportTickets/customerSupportTickets.router'
import { fleetManagementRouter } from './fleetManagement/fleetManagement.router'
import { locationsRouter } from './locations/locations.router'
import { vehiclesRouter } from './vehicles/vehicles.router'
import { vehicleSpecificationsRouter } from './vehicleSpecifications/vehicleSpecifications.router'

const app = new Hono().basePath('/api')

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })
const { printMetrics, registerMetrics } = prometheus()

// inbuilt middlewares
app.use(logger())
app.use(csrf()) 
app.use(trimTrailingSlash())
app.use('*', registerMetrics)
app.use('/', timeout(10000, customTimeoutException))
app.use('*', registerMetrics)

app.get('/ok', (c) => {
  return c.text('The server is running☑️')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)

// Routes
app.route('/', UserRouter)  // api/users
app.route('/', authRouter)   // api/auth/register or api/auth/login
app.route('/', paymentsRouter)  // api/payments
app.route('/', bookingsRouter)  // api/bookings
app.route('/', customerSupportTicketsRouter)  // api/customerSupportTickets
app.route('/', fleetManagementRouter)  // api/fleetManagement
app.route('/', locationsRouter)  // api/locations
app.route('/', paymentsRouter)  // api/payments
app.route('/', vehiclesRouter)  // api/vehicles
app.route('/', vehicleSpecificationsRouter)  // api/vehicleSpecifications

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

// const port = 3000 
const port = Number(process.env.PORT)
console.log(`Server is running on port ${process.env.PORT}`);
app.get('/metrics', printMetrics)

console.log('Registered routes: ', app.routes);

serve({
  fetch: app.fetch,
  port: 3000,
});
