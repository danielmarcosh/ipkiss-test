import { Router } from "express";
import { BalanceAccountController } from "@modules/accounts/useCases/balanceAccount/BalanceAccountController";

const balanceRoutes = Router();

const balanceAccountController = new BalanceAccountController();

balanceRoutes.get("/", balanceAccountController.handle);

export { balanceRoutes };
