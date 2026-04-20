import { Router } from "express";
import * as bookingsController from "../../controllers/bookings.controller.ts";

import {
    validateRequestBody,
} from "../../validators/request.validator.ts";

import * as bookingValidator from "../../validators/booking.validator.ts";

const router = Router();

router.get("/", bookingsController.getAll);
router.post("/", validateRequestBody(bookingValidator.createSchema), bookingsController.create);

export default router;
