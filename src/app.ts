import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";

import createConnection from "./database";
import { AppError } from "./errors/AppError";
import { router } from "./routes";

createConnection();

let app = express();

app.use(express.json());
app.use(router);

app.use((
    error: Error,
    request: Request,
    response: Response,
    _next: NextFunction
) => {
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({
                message: error.message
            });
    }

    return response
        .status(500)
        .json({
            message: `Internal server error: ${error.message}`
        });
});

export { app };
