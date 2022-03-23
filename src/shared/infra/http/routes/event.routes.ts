import { EventAccountController } from "@modules/accounts/useCases/eventAccount/EventAccountController";
import { Router } from "express";

const eventRoutes = Router();

const eventAccountController = new EventAccountController();

eventRoutes.post("/", eventAccountController.handle);

export { eventRoutes };
