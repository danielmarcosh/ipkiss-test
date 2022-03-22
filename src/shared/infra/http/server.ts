import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(4000, () => console.log("Server is running!"));
