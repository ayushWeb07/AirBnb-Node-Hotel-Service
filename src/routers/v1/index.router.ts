import { Router } from "express";
import hotelsRouter from "./hotels.router.ts";

const router = Router();

// setup all app routes
router.use("/hotels", hotelsRouter);

export default router;
