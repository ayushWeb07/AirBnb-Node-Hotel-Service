import { Router } from "express";
import * as roomTypeController from "../../controllers/roomType.controller.ts";

import {
	validateRequestBody,
	validateRequestUrlParams,
} from "../../validators/request.validator.ts";

import * as roomTypeValidator from "../../validators/roomType.validator.ts";

const router = Router();

router.get(
	"/hotel/:id",
	validateRequestUrlParams(roomTypeValidator.getAllByHotelIdSchema),
	roomTypeController.getAllRoomTypesByHotelId,
);

router.get(
	"/:id",
	validateRequestUrlParams(roomTypeValidator.getByIdSchema),
	roomTypeController.getRoomTypeById,
);

router.post(
	"/",
	validateRequestBody(roomTypeValidator.createSchema),
	roomTypeController.createRoomType,
);

router.delete(
	"/:id",
	validateRequestUrlParams(roomTypeValidator.removeSchema),
	roomTypeController.removeRoomTypeById,
);

router.patch(
	"/:id",
	validateRequestUrlParams(roomTypeValidator.updateUrlParamsSchema),
	validateRequestBody(roomTypeValidator.updateBodySchema),
	roomTypeController.updateRoomType,
);

export default router;
