import { logger } from "../config/logger.config.ts";
import RoomType from "../db/models/roomType.ts";
import * as roomTypeDto from "../dtos/roomType.dto.ts";
import {
	InternalServerError,
	NotFoundError,
} from "../utils/errors/app.error.ts";
import Hotel from "../db/models/hotel.ts";

// create a room type entry
const createRoomType = async (roomTypeData: roomTypeDto.createRoomType) => {
	try {
		// check if the hotel even exists
		const hotel = await Hotel.findByPk(roomTypeData.hotelId);

		if (hotel === null) {
			logger.error("RoomTypes: createRoomType -> failure", {
				hotelId: roomTypeData.hotelId,
				error: "Hotel not found",
			});

			throw new NotFoundError("Hotel not found");
		}

		const newRoomType = await RoomType.create(roomTypeData);

		logger.info("RoomTypes: create -> success", {
			id: newRoomType.id,
		});

		return newRoomType;
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("RoomTypes: create -> failure", error);

			throw new InternalServerError(
				"Something went wrong while adding the room type",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// get all room type entries of a specific hotel
const getAllRoomTypesByHotelId = async (hotelId: number) => {
	try {
		// check if the hotel even exists
		const hotel = await Hotel.findByPk(hotelId);

		if (hotel === null) {
			logger.error("RoomTypes: getAllRoomTypesByHotelId -> failure", {
				hotelId,
				error: "Hotel not found",
			});

			throw new NotFoundError("Hotel not found");
		}

		const roomTypes = await RoomType.findAll({
			where: {
				hotelId,
			},
		});

		logger.info("RoomTypes: getAll -> success", {
			count: roomTypes.length,
		});

		return roomTypes;
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("RoomTypes: getAll -> failure", error);

			throw new InternalServerError(
				"Something went wrong while getting all the room types",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// get a single room type entry by id
const getRoomTypeById = async (id: number) => {
	try {
		const roomType = await RoomType.findByPk(id);

		if (roomType === null) {
			logger.error("RoomTypes: getById -> failure", {
				id,
				error: "Room type not found",
			});

			throw new NotFoundError("Room type not found");
		} else {
			logger.info("RoomTypes: getById -> success", {
				id: roomType.id,
			});

			return roomType;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("RoomTypes: getById -> failure", error);

			throw new InternalServerError(
				"Something went wrong while getting the room type by id",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// remove room type entry by id
const removeRoomTypeById = async (id: number) => {
	try {
		const roomType = await RoomType.findByPk(id);

		if (roomType === null) {
			logger.error("RoomTypes: remove -> failure", {
				id,
				error: "Room type not found",
			});

			throw new NotFoundError("Room type not found");
		} else {
			await roomType.destroy();

			logger.info("RoomTypes: remove -> success", {
				id: roomType.id,
			});

			return roomType;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("RoomTypes: remove -> failure", error);

			throw new InternalServerError(
				"Something went wrong while removing the room type",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// update a single room type entry
const updateRoomType = async (
	id: number,
	roomTypeData: roomTypeDto.updateRoomType,
) => {
	try {
		const roomType = await RoomType.findByPk(id);

		if (roomType === null) {
			logger.error("RoomTypes: update -> failure", {
				id,
				error: "Room type not found",
			});

			throw new NotFoundError("Room type not found");
		} else {
			// check if updated hotelId exists
			if (roomTypeData.hotelId) {
				const hotel = await Hotel.findByPk(roomTypeData.hotelId);

				if (hotel === null) {
					logger.error("RoomTypes: updateRoomType -> failure", {
						hotelId: roomTypeData.hotelId,
						error: "Hotel not found",
					});

					throw new NotFoundError("Hotel not found");
				}
			}

			await roomType.update({ ...roomTypeData });

			logger.info("RoomTypes: update -> success", {
				id: roomType.id,
			});

			return roomType;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("RoomTypes: update -> failure", error);

			throw new InternalServerError(
				"Something went wrong while updating the room type",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

export {
	createRoomType,
	getAllRoomTypesByHotelId,
	getRoomTypeById,
	removeRoomTypeById,
	updateRoomType,
};
