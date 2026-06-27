import { logger } from "../config/logger.config.ts";
import Room from "../db/models/room.ts";
import * as roomDto from "../dtos/room.dto.ts";
import {
	InternalServerError,
	NotFoundError,
} from "../utils/errors/app.error.ts";
import { Op } from "sequelize";

// create a room entry
const createRoom = async (roomData: roomDto.createRoom) => {
	try {
		const newRoom = await Room.create(roomData);

		logger.info("Rooms: create -> success", {
			id: newRoom.id,
		});

		return newRoom;
	} catch (error) {
		logger.error("Rooms: create -> failure", error);

		throw new InternalServerError(
			"Something went wrong while adding the room",
			error instanceof Error ? error.stack : undefined,
		);
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

		logger.info("Rooms: getAll -> success", {
			count: rooms.length,
		});

		return rooms;
	} catch (error) {
		logger.error("Rooms: getAll -> failure", error);

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
			logger.error("Rooms: getById -> failure", {
				id,
				error: "Room not found",
			});

			throw new NotFoundError("Room not found");
		} else {
			logger.info("Rooms: getById -> success", {
				id: room.id,
			});

			return room;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: getById -> failure", error);

			throw new InternalServerError(
				"Something went wrong while getting the room by id",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// get a single room entry by id
const getRoomsByRoomTypeIdAndAvailableDateRange = async (
	roomData: roomDto.getRoomsByRoomTypeIdAndAvailableDateRange,
) => {
	try {
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
		logger.error(
			"Rooms: getRoomsByRoomTypeIdAndAvailableDateRange -> failure",
			error,
		);

		throw new InternalServerError(
			"Something went wrong while getting all the rooms",
			error instanceof Error ? error.stack : undefined,
		);
	}
};

// remove room entry by id
const removeRoomById = async (id: number) => {
	try {
		const room = await Room.findByPk(id);

		if (room === null) {
			logger.error("Rooms: remove -> failure", {
				id,
				error: "Room not found",
			});

			throw new NotFoundError("Room not found");
		} else {
			await room.destroy();

			logger.info("Rooms: remove -> success", {
				id: room.id,
			});

			return room;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: remove -> failure", error);

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
			logger.error("Rooms: update -> failure", {
				id,
				error: "Room not found",
			});

			throw new NotFoundError("Room not found");
		} else {
			await room.update({ ...roomData });

			logger.info("Rooms: update -> success", {
				id: room.id,
			});

			return room;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Rooms: update -> failure", error);

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
