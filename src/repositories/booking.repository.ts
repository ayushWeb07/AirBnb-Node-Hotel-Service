import { logger } from "../config/logger.config.ts";
import Booking from "../db/models/booking.ts";
import * as bookingDto from "../dtos/booking.dto.ts";
import {BadRequestError, InternalServerError} from "../utils/errors/app.error.ts";

// create a booking entry
const create = async (bookingData: bookingDto.create) => {
    try {

        // step 1: find a booking by the idempotencyKey
        const existingBooking= await Booking.findOne({ where: { idempotentKey: bookingData.idempotentKey } });

        // give error if it already exists as it might be a case of double booking
        if(existingBooking) {
            logger.error("Bookings: create -> failure", {
                idempotencyKey: bookingData.idempotentKey,
                error: "A booking with this idempotencyKey already exists",
            });

            throw new BadRequestError("A booking with this idempotencyKey already exists")
        }

        // step 2: generate a new booking otherwise
        const newBooking = await Booking.create(bookingData);

        logger.info("Bookings: create -> success", {
            id: newBooking.id,
        });

        return newBooking;
    } catch (error) {
        if(error instanceof BadRequestError) {
            throw error;
        }

        else {
            logger.error("Bookings: create -> failure", error);

            throw new InternalServerError(
                "Something went wrong while adding the booking",
                error instanceof Error ? error.stack : undefined,
            );
        }
    }
};

// get all booking entries
const getAll = async () => {
    try {
        const bookings = await Booking.findAll();

        logger.info("Bookings: getAll -> success", {
            count: bookings.length,
        });

        return bookings;
    } catch (error) {
        logger.error("Bookings: getAll -> failure", error);

        throw new InternalServerError(
            "Something went wrong while getting all the bookings",
            error instanceof Error ? error.stack : undefined,
        );
    }
};

export { create, getAll };
