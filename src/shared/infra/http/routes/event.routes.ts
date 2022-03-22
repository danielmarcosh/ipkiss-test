import { Request, Response, Router } from "express";

const eventRoutes = Router();

eventRoutes.post("/", (request: Request, response: Response) => {
  console.log("event router");
});

export { eventRoutes };
