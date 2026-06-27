import type { Request, Response } from "express";
import * as roomTypeService from "../services/roomType.service.ts";

import { StatusCodes } from "http-status-codes";

const createRoomType = async (req: Request, res: Response) => {
	const roomType = await roomTypeService.createRoomType(req.body);

	res.status(StatusCodes.CREATED).json({
		message: "New room type was added successfully",
		data: roomType,
		success: true,
	});
};

const getAllRoomTypesByHotelId = async (req: Request, res: Response) => {
	const roomTypes = await roomTypeService.getAllRoomTypesByHotelId(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Fetched the room types of the hotel successfully",
		data: roomTypes,
		success: true,
	});
};

const getRoomTypeById = async (req: Request, res: Response) => {
	const roomType = await roomTypeService.getRoomTypeById(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Fetched the room type successfully",
		data: roomType,
		success: true,
	});
};

const removeRoomTypeById = async (req: Request, res: Response) => {
	const roomType = await roomTypeService.removeRoomTypeById(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Removed the room type successfully",
		data: roomType,
		success: true,
	});
};

const updateRoomType = async (req: Request, res: Response) => {
	const roomType = await roomTypeService.updateRoomType(Number(req.params.id), req.body);

	res.status(StatusCodes.OK).json({
		message: "Updated the room type successfully",
		data: roomType,
		success: true,
	});
};

export {
	createRoomType,
	getAllRoomTypesByHotelId,
	getRoomTypeById,
	removeRoomTypeById,
	updateRoomType,
};
