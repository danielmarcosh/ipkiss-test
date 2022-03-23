import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { router } from "./routes";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { EventError } from "@shared/errors/EventError";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    } else if (err instanceof EventError) {
      return response.status(err.statusCode).json(err.value);
    }

    return response.status(500).json({
      status: "Error!",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(4000, () => console.log("Server is running!"));
