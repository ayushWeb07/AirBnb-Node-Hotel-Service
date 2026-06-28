import * as roomTypeRepository from "../repositories/roomType.repository.ts";
import * as roomRepository from "../repositories/room.repository.ts";
import * as roomGenerationDto from "../dtos/roomGeneration.dto.ts";
import * as roomDto from "../dtos/room.dto.ts";
import { logger } from "../config/logger.config.ts";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "../utils/errors/app.error.ts";

const createRoomGenerationJob = async (
	jobData: roomGenerationDto.createRoomGenerationJob,
) => {
	try {
		// check if the room type exists
		const roomType = await roomTypeRepository.getRoomTypeById(
			jobData.roomTypeId,
		);

		if (roomType === null) {
			logger.error("RoomGeneration: createRoomGenerationJob -> failure", {
				id: jobData.roomTypeId,
				error: "Room type not found",
			});

			throw new NotFoundError("Room type not found");
		}

		// format dates
		const startDate = new Date(jobData.startDate);
		const endDate = new Date(jobData.endDate);

		// check if the startDate comes prior to endDate
		if (startDate >= endDate) {
			logger.error("RoomGeneration: createRoomGenerationJob -> failure", {
				error: "Start date must be prior to end date",
			});

			throw new BadRequestError("Start date must be prior to end date");
		}

		// check if startDate is in future
		if (startDate < new Date()) {
			logger.error("RoomGeneration: createRoomGenerationJob -> failure", {
				error: "Start date must be in future",
			});

			throw new BadRequestError("Start date must be in future");
		}

		// calculate the days
		const totalDays = Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
		);

		if (totalDays === 0) {
			logger.error("RoomGeneration: createRoomGenerationJob -> failure", {
				error:
					"At least there should be one day gap in between start and end dates",
			});

			throw new BadRequestError(
				"At least there should be one day gap in between start and end dates",
			);
		}

		// batch process the dates and create rooms
		const batchSize = jobData.batchSize;
		let currentDate = new Date(startDate);
		let totalDatesProcessed = 0;
		let totalRoomsCreated = 0;

		while (currentDate < endDate) {
			// calculate the batch end date
			let batchEndDate = new Date(currentDate);
			batchEndDate.setDate(batchEndDate.getDate() + batchSize);

			// clamp
			if (batchEndDate > endDate) {
				batchEndDate = new Date(endDate);
			}

			// create the rooms
			const { roomsCreated, datesProcessed } = await batchProcessRooms({
				roomTypeId: roomType.id,
				hotelId: roomType.hotelId,
				price: jobData.price,
				startDate: currentDate,
				endDate: batchEndDate,
			});

			// update the current date and counters
			currentDate = new Date(batchEndDate);
			currentDate.setDate(currentDate.getDate() + 1);

			totalDatesProcessed += datesProcessed;
			totalRoomsCreated += roomsCreated;
		}

		return {
			totalRoomsCreated,
			totalDatesProcessed,
		};
	} catch (error) {
		if (error instanceof NotFoundError || error instanceof BadRequestError) {
			throw error;
		} else {
			logger.error("RoomGeneration: createRoomGenerationJob -> failure", error);

			throw new InternalServerError(
				"Something went wrong while generating the rooms",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

const batchProcessRooms = async (
	jobData: roomGenerationDto.batchProcessRooms,
) => {
	const startDate = jobData.startDate;
	const endDate = jobData.endDate;

	// find the rooms of this roomType id and within this available date
	const existingRooms =
		await roomRepository.getRoomsByRoomTypeIdAndAvailableDateRange({
			roomTypeId: jobData.roomTypeId,
			startDate,
			endDate,
		});

	const existingDates = new Set(
		existingRooms.map((r) => r.availableOn.toISOString().split("T")[0]),
	);

	// find the rooms to create
	const currentDate = new Date(startDate);
	let roomsToCreate: roomDto.createRoom[] = [];
	let datesProcessed = 0;
	let roomsCreated = 0;

	while (currentDate <= endDate) {
		const dateStr = currentDate.toISOString().split("T")[0];

		if (!existingDates.has(dateStr)) {
			roomsToCreate.push({
				price: jobData.price,
				roomTypeId: jobData.roomTypeId,
				hotelId: jobData.hotelId,
				bookingId: null,
				availableOn: new Date(currentDate),
			});
		}

		currentDate.setDate(currentDate.getDate() + 1);
		datesProcessed++;
	}

	// bulk create the rooms
	if (roomsToCreate.length > 0) {
		const newRooms = await roomRepository.bulkCreateRooms({
			rooms: roomsToCreate,
		});

		roomsCreated += newRooms.length;
	}

	return {
		roomsCreated,
		datesProcessed,
	};
};

export { createRoomGenerationJob };
