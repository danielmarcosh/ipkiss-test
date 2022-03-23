import { CreateAccountController } from "@modules/accounts/useCases/CreateAccountController";
import { Router } from "express";

const eventRoutes = Router();

const createAccountController = new CreateAccountController();

eventRoutes.post("/", createAccountController.handle);

export { eventRoutes };
