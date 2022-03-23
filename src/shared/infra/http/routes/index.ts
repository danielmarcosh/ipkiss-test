import { Router } from "express";
import { balanceRoutes } from "./balance.routes";
import { eventRoutes } from "./event.routes";
import { resetRoutes } from "./reset.routes";

const router = Router();

router.use("/event", eventRoutes);
router.use("/balance", balanceRoutes);
router.use("/reset", resetRoutes);

export { router };
