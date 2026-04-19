import { logger } from "../config/logger.config.ts";
import Hotel from "../db/models/hotel.ts";
import * as hotelDto from "../dtos/hotel.dto.ts";
import { InternalServerError, NotFoundError } from "../utils/errors/app.error.ts";

// create a hotel entry
const create = async (hotelData: hotelDto.create) => {
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

    logger.info("Hotels: getAll -> success", {
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
        error: "Hotel not found",
      });

      throw new NotFoundError("Hotel not found");
    } else {
      logger.info("Hotels: getById -> success", {
        id: hotel.id,
      });

      return hotel;
    }
  } catch (error) {

    if (error instanceof NotFoundError) {
      throw error;
    }

    else {
      logger.error("Hotels: getById -> failure", error);

      throw new InternalServerError(
          "Something went wrong while getting the hotel by id",
          error instanceof Error ? error.stack : undefined,
      );
    }
  }
};

// remove hotel entry by id
const remove = async (id: number) => {
  try {
    const hotel = await Hotel.findByPk(id);

    if (hotel === null) {
      logger.error("Hotels: remove -> failure", {
        error: "Hotel not found",
      });

      throw new NotFoundError("Hotel not found");
    } else {
      await hotel.destroy();

      logger.info("Hotels: remove -> success", {
        id: hotel.id,
      });

      return hotel;
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    else {
      logger.error("Hotels: remove -> failure", error);

      throw new InternalServerError(
          "Something went wrong while removing the hotel",
          error instanceof Error ? error.stack : undefined,
      );
    }
  }
};

// update a single hotel entry
const update = async (id: number, hotelData: hotelDto.update) => {
  try {
    const hotel = await Hotel.findByPk(id);

    if (hotel === null) {
      logger.error("Hotels: update -> failure", {
        error: "Hotel not found",
      });

      throw new NotFoundError("Hotel not found");
    } else {
      await hotel.update({ ...hotelData });

      logger.info("Hotels: update -> success", {
        id: hotel.id,
      });

      return hotel;
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    else {
      logger.error("Hotels: update -> failure", error);

      throw new InternalServerError(
          "Something went wrong while updating the hotel",
          error instanceof Error ? error.stack : undefined,
      );
    }
  }
};

export { create, getAll, getById, remove, update };
