import { Request, Response, Router } from "express";

const balanceRoutes = Router();

balanceRoutes.get("/", (request: Request, response: Response) => {
  const { account_id } = request.query;

  console.log("account_id: ", account_id);

  return response.send();
});

export { balanceRoutes };
