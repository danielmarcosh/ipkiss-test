import { Router } from "express";
import { CreateAccountController } from "@modules/accounts/useCases/createAccount/CreateAccountController";

const eventRoutes = Router();

const createAccountController = new CreateAccountController();

eventRoutes.post("/", createAccountController.handle);

export { eventRoutes };
