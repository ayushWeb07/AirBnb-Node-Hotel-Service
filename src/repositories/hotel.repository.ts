import { logger } from "../config/logger.config";
import Hotel from "../db/models/hotel";
import type { createHotel } from "../dtos/hotel.dto";
import { InternalServerError, NotFoundError } from "../utils/errors/app.error";

// create a hotel entry
const create = async (hotelData: createHotel) => {
  try {
    const newHotel = await Hotel.create(hotelData);

    logger.info("Hotels: create -> success", {
      id: newHotel.id,
    });

    return newHotel;
  } catch (error) {
    logger.error("Hotels: create -> failure", error);

    throw new InternalServerError(
      "Something went wrong while adding the hotel",
      error instanceof Error ? error.stack : undefined,
    );
  }
};

// get all hotel entries
const getAll = async () => {
  try {
    const hotels = await Hotel.findAll();

    logger.info("Hotels: getAll -> success: ", {
      count: hotels.length,
    });

    return hotels;
  } catch (error) {
    logger.error("Hotels: getAll -> failure", error);

    throw new InternalServerError(
      "Something went wrong while getting all the hotels",
      error instanceof Error ? error.stack : undefined,
    );
  }
};

// get a single hotel entry by id
const getById = async (id: number) => {
  try {
    const hotel = await Hotel.findByPk(id);

    if (hotel === null) {
      logger.error("Hotels: getById -> failure", {
        message: "Hotel not found",
      });

      throw new NotFoundError("Hotel not found");
    } else {
      logger.info("Hotels: getById -> success: ", {
        id: hotel.id,
      });

      return hotel;
    }
  } catch (error) {
    logger.error("Hotels: getById -> failure", error);

    throw new InternalServerError(
      "Something went wrong while getting the hotel by id",
      error instanceof Error ? error.stack : undefined,
    );
  }
};

export { create, getAll, getById };
