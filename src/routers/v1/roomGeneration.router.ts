import { Router } from "express";
import * as roomGenerationController from "../../controllers/roomGeneration.controller.ts";

import {
	validateRequestBody,
} from "../../validators/request.validator.ts";

import * as roomGenerationValidator from "../../validators/roomGeneration.validator.ts";

const router = Router();

router.post(
	"/",
	validateRequestBody(roomGenerationValidator.createRoomGenerationJobSchema),
	roomGenerationController.createRoomGenerationJob,
);

export default router;
