import { logger } from "../config/logger.config.ts";
import Room from "../db/models/room.ts";
import * as roomDto from "../dtos/room.dto.ts";
import {
	InternalServerError,
	NotFoundError,
} from "../utils/errors/app.error.ts";
import { Op } from "sequelize";
import Hotel from "../db/models/hotel.ts";
import RoomType from "../db/models/roomType.ts";

// create a room entry
const createRoom = async (roomData: roomDto.createRoom) => {
	try {
		// check if the hotel even exists
		const hotel = await Hotel.findByPk(roomData.hotelId);

		if (hotel === null) {
			logger.error("Rooms: createRoom -> failure", {
				hotelId: roomData.hotelId,
				error: "Hotel not found",
			});

			throw new NotFoundError("Hotel not found");
		}

		// check if the room type even exists
		const roomType = await RoomType.findByPk(roomData.roomTypeId);

		if (roomType === null) {
			logger.error("Rooms: createRoom -> failure", {
				roomTypeId: roomData.roomTypeId,
				error: "Room type not found",
			});

			throw new NotFoundError("Room type not found");
		}

		const newRoom = await Room.create(roomData);

		logger.info("Rooms: createRoom -> success", {
			id: newRoom.id,
		});

		return newRoom;
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: createRoom -> failure", error);

			throw new InternalServerError(
				"Something went wrong while adding the room",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// create bulk room entries
const bulkCreateRooms = async (roomData: roomDto.bulkCreateRooms) => {
	try {
		const newRooms = await Room.bulkCreate(roomData.rooms);

		logger.info("Rooms: bulkCreateRooms -> success", {
			count: newRooms.length,
		});

		return newRooms;
	} catch (error) {
		logger.error("Rooms: bulkCreateRooms -> failure", error);

		throw new InternalServerError(
			"Something went wrong while bulk adding the rooms",
			error instanceof Error ? error.stack : undefined,
		);
	}
};

// get all room entries
const getAllRooms = async () => {
	try {
		const rooms = await Room.findAll();

		logger.info("Rooms: getAllRooms -> success", {
			count: rooms.length,
		});

		return rooms;
	} catch (error) {
		logger.error("Rooms: getAllRooms -> failure", error);

		throw new InternalServerError(
			"Something went wrong while getting all the rooms",
			error instanceof Error ? error.stack : undefined,
		);
	}
};

// get a single room entry by id
const getRoomById = async (id: number) => {
	try {
		const room = await Room.findByPk(id);

		if (room === null) {
			logger.error("Rooms: getRoomById -> failure", {
				id,
				error: "Room not found",
			});

			throw new NotFoundError("Room not found");
		} else {
			logger.info("Rooms: getRoomById -> success", {
				id: room.id,
			});

			return room;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: getRoomById -> failure", error);

			throw new InternalServerError(
				"Something went wrong while getting the room by id",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// get rooms by room type id and available date range
const getRoomsByRoomTypeIdAndAvailableDateRange = async (
	roomData: roomDto.getRoomsByRoomTypeIdAndAvailableDateRange,
) => {
	try {
		// check if the room type even exists
		const roomType = await RoomType.findByPk(roomData.roomTypeId);

		if (roomType === null) {
			logger.error(
				"Rooms: getRoomsByRoomTypeIdAndAvailableDateRange -> failure",
				{
					roomTypeId: roomData.roomTypeId,
					error: "Room type not found",
				},
			);

			throw new NotFoundError("Room type not found");
		}

		const rooms = await Room.findAll({
			where: {
				roomTypeId: roomData.roomTypeId,
				availableOn: {
					[Op.gt]: roomData.startDate,
					[Op.lt]: roomData.endDate,
				},
			},
		});

		logger.info("Rooms: getRoomsByRoomTypeIdAndAvailableDateRange -> success", {
			count: rooms.length,
		});

		return rooms;
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error(
				"Rooms: getRoomsByRoomTypeIdAndAvailableDateRange -> failure",
				error,
			);

			throw new InternalServerError(
				"Something went wrong while getting all the rooms",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// remove room entry by id
const removeRoomById = async (id: number) => {
	try {
		const room = await Room.findByPk(id);

		if (room === null) {
			logger.error("Rooms: removeRoomById -> failure", {
				id,
				error: "Room not found",
			});

			throw new NotFoundError("Room not found");
		} else {
			await room.destroy();

			logger.info("Rooms: removeRoomById -> success", {
				id: room.id,
			});

			return room;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: removeRoomById -> failure", error);

			throw new InternalServerError(
				"Something went wrong while removing the room",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// update a single room entry
const updateRoom = async (id: number, roomData: roomDto.updateRoom) => {
	try {
		const room = await Room.findByPk(id);

		if (room === null) {
			logger.error("Rooms: updateRoom -> failure", {
				id,
				error: "Room not found",
			});

			throw new NotFoundError("Room not found");
		} else {
			// check if the hotel even exists
			if (roomData.hotelId) {
				const hotel = await Hotel.findByPk(roomData.hotelId);

				if (hotel === null) {
					logger.error("Rooms: updateRoom -> failure", {
						hotelId: roomData.hotelId,
						error: "Hotel not found",
					});

					throw new NotFoundError("Hotel not found");
				}
			}

			// check if the room type even exists
			if (roomData.roomTypeId) {
				const roomType = await RoomType.findByPk(roomData.roomTypeId);

				if (roomType === null) {
					logger.error("Rooms: updateRoom -> failure", {
						roomTypeId: roomData.roomTypeId,
						error: "Room type not found",
					});

					throw new NotFoundError("Room type not found");
				}
			}

			await room.update({ ...roomData });

			logger.info("Rooms: updateRoom -> success", {
				id: room.id,
			});

			return room;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: updateRoom -> failure", error);

			throw new InternalServerError(
				"Something went wrong while updating the room",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

export {
	createRoom,
	bulkCreateRooms,
	getAllRooms,
	getRoomById,
	getRoomsByRoomTypeIdAndAvailableDateRange,
	removeRoomById,
	updateRoom,
};
