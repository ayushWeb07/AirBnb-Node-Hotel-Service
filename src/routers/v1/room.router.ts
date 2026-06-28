import { Router } from "express";
import * as roomController from "../../controllers/room.controller.ts";

import {
	validateRequestBody,
	validateRequestUrlParams,
} from "../../validators/request.validator.ts";

import * as roomValidator from "../../validators/room.validator.ts";

const router = Router();

router.get("/", roomController.getAllRooms);

router.get(
	"/:id",
	validateRequestUrlParams(roomValidator.getByIdSchema),
	roomController.getRoomById,
);

router.post(
	"/",
	validateRequestBody(roomValidator.createSchema),
	roomController.createRoom,
);

router.delete(
	"/:id",
	validateRequestUrlParams(roomValidator.removeSchema),
	roomController.removeRoomById,
);

router.patch(
	"/:id",
	validateRequestUrlParams(roomValidator.updateUrlParamsSchema),
	validateRequestBody(roomValidator.updateBodySchema),
	roomController.updateRoom,
);

export default router;
