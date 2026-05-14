import { Router } from "express";
import * as hotelsController from "../../controllers/hotels.controller.ts";

import {
	validateRequestBody,
	validateRequestUrlParams,
} from "../../validators/request.validator.ts";

import * as hotelValidator from "../../validators/hotel.validator.ts";

const router = Router();

router.get("/", hotelsController.getAll);
router.get(
	"/:id",
	validateRequestUrlParams(hotelValidator.getByIdSchema),
	hotelsController.getById,
);
router.post(
	"/",
	validateRequestBody(hotelValidator.createSchema),
	hotelsController.create,
);
router.delete(
	"/:id",
	validateRequestUrlParams(hotelValidator.removeSchema),
	hotelsController.remove,
);
router.patch(
	"/:id",
	validateRequestUrlParams(hotelValidator.updateUrlParamsSchema),
	validateRequestBody(hotelValidator.updateBodySchema),
	hotelsController.update,
);

export default router;
