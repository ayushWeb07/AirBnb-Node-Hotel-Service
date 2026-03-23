import { Router } from "express";
import * as hotelsController from "../../controllers/hotels.controller.ts";

import {
  validateRequestBody,
  validateRequestUrlParams,
} from "../../validators/index.ts";

import * as hotelValidator from "../../validators/hotel.validator.ts";

const router = Router();

router.get("/", hotelsController.getAll);
router.get("/:id", validateRequestUrlParams(hotelValidator.getByIdSchema), hotelsController.getById);
router.post("/", validateRequestBody(hotelValidator.createSchema), hotelsController.create);

export default router;
