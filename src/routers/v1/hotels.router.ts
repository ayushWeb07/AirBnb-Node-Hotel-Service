import { Router } from "express";
import * as hotelsController from "../../controllers/hotels.controller.ts";

import {
	validateRequestBody,
	validateRequestUrlParams,
} from "../../validators/request.validator.ts";

import * as hotelValidator from "../../validators/hotel.validator.ts";

const router = Router();

router.get("/", hotelsController.getAllHotels);
router.get(
	"/:id",
	validateRequestUrlParams(hotelValidator.getByIdSchema),
	hotelsController.getHotelById,
);
router.post(
	"/",
	validateRequestBody(hotelValidator.createSchema),
	hotelsController.createHotel,
);
router.delete(
	"/:id",
	validateRequestUrlParams(hotelValidator.removeSchema),
	hotelsController.removeHotelById,
);
router.patch(
	"/:id",
	validateRequestUrlParams(hotelValidator.updateUrlParamsSchema),
	validateRequestBody(hotelValidator.updateBodySchema),
	hotelsController.updateHotel,
);

export default router;
