import { Router } from "express";
import hotelsRouter from "./hotels.router.ts";
import roomGenerationRouter from "./roomGeneration.router.ts";
import roomTypeRouter from "./roomType.router.ts";
import roomRouter from "./room.router.ts";

const router = Router();

// setup all app routes
router.use("/hotels", hotelsRouter);
router.use("/rooms", roomRouter);
router.use("/rooms-generation", roomGenerationRouter);
router.use("/room-types", roomTypeRouter);

export default router;
