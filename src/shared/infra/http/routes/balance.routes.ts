import { Request, Response, Router } from "express";

const balanceRoutes = Router();

balanceRoutes.get("/", (request: Request, response: Response) => {
  console.log("balance router");
});

export { balanceRoutes };
