/**
 * @fileoverview Entry point for the Express server.
 * Initializes middleware, routes, database connection, authentication, and error handling.
 */

import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import swaggerSpec from "./app/swagger/swagger-config";

// Load environment variables and configuration settings
loadConfig();

/**
 * Extending the Express namespace to include custom user properties.
 */
declare global {
  namespace Express {
    /**
     * Custom user interface excluding password for security reasons.
     */
    interface User extends Omit<IUser, "password"> {}

    /**
     * Extends the Request interface to optionally include a user object.
     */
    interface Request {
      user?: User;
    }
  }
}

// Define the server port, defaulting to 5000 if not set in environment variables
const port = Number(process.env.PORT) || 5000;

// Initialize the Express application
const app: Express = express();

/**
 * Middleware: Enable CORS with specific settings.
 */
app.use(
  cors({
    origin: "*", // Allows requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

/**
 * Middleware: API documentation using Swagger.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Middleware: Parse incoming request bodies.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

/**
 * Middleware: Logging HTTP requests to the console.
 */
app.use(morgan("dev"));

/**
 * Initializes the application.
 * - Connects to the database.
 * - Sets up authentication.
 * - Configures routes.
 * - Starts the server.
 */
const initApp = async (): Promise<void> => {
  try {
    // Initialize database connection
    await initDB();

    // Initialize passport authentication strategies
    initPassport();

    // Define API routes
    app.use("/api", routes);

    /**
     * Health check route.
     * @route GET /
     * @returns {Object} 200 - Status of the server.
     */
    app.get("/", (req: Request, res: Response) => {
      res.send({ status: "ok" });
    });

    // Error handling middleware (should be placed after all routes)
    app.use(errorHandler);

    // Start the HTTP server
    http.createServer(app).listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error initializing application:", error);
    process.exit(1); // Exit process on failure
  }
};

// Execute the application initialization
void initApp();
