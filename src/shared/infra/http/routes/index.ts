import { Router } from "express";
import { balanceRoutes } from "./balance.routes";
import { eventRoutes } from "./event.routes";

const router = Router();

router.use("/event", eventRoutes);
router.use("/balance", balanceRoutes);

export { router };
