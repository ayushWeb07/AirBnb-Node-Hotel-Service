import { Router } from "express";
import hotelsRouter from "./hotels.router.ts";
import roomGenerationRouter from "./roomGeneration.router.ts";

const router = Router();

// setup all app routes
router.use("/hotels", hotelsRouter);
router.use("/rooms-generation", roomGenerationRouter);

export default router;
