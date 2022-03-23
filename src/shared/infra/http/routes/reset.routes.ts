import { ResetAccountController } from "@modules/accounts/useCases/resetAccounts/ResetAccountController";
import { Router } from "express";

const resetRoutes = Router();

const resetAccountController = new ResetAccountController();

resetRoutes.get("/", resetAccountController.handle);

export { resetRoutes };
