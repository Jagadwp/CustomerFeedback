import express from 'express';
import { config } from './config/config.js'
import routes from './routes/routes.js';

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define your routes and API endpoints here
app.use(routes);

// Start the server
app.listen(config.PORT, function () {
  console.log(`listening on http://localhost:${process.env.PORT}/`);
});
