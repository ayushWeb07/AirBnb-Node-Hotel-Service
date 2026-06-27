import type { Request, Response } from "express";
import * as roomService from "../services/room.service.ts";

import { StatusCodes } from "http-status-codes";

const createRoom = async (req: Request, res: Response) => {
	const room = await roomService.createRoom(req.body);

	res.status(StatusCodes.CREATED).json({
		message: "New room was added successfully",
		data: room,
		success: true,
	});
};

const getAllRooms = async (req: Request, res: Response) => {
	const rooms = await roomService.getAllRooms();

	res.status(StatusCodes.OK).json({
		message: "Fetched all the rooms successfully",
		data: rooms,
		success: true,
	});
};

const getRoomById = async (req: Request, res: Response) => {
	const room = await roomService.getRoomById(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Fetched the room successfully",
		data: room,
		success: true,
	});
};

const removeRoomById = async (req: Request, res: Response) => {
	const room = await roomService.removeRoomById(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Removed the room successfully",
		data: room,
		success: true,
	});
};

const updateRoom = async (req: Request, res: Response) => {
	const room = await roomService.updateRoom(Number(req.params.id), req.body);

	res.status(StatusCodes.OK).json({
		message: "Updated the room successfully",
		data: room,
		success: true,
	});
};

export { createRoom, getAllRooms, getRoomById, removeRoomById, updateRoom };
