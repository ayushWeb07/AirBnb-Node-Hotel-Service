import type { Request, Response } from "express";
import * as hotelService from "../services/hotel.service.ts";

import { StatusCodes } from "http-status-codes";

const createHotel = async (req: Request, res: Response) => {
	const hotel = await hotelService.createHotel(req.body);

	res.status(StatusCodes.CREATED).json({
		message: "New hotel was added successfully",
		data: hotel,
		success: true,
	});
};

const getAllHotels = async (req: Request, res: Response) => {
	const hotels = await hotelService.getAllHotels();

	res.status(StatusCodes.OK).json({
		message: "Fetched all the hotels successfully",
		data: hotels,
		success: true,
	});
};

const getHotelById = async (req: Request, res: Response) => {
	const hotel = await hotelService.getHotelById(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Fetched the hotel successfully",
		data: hotel,
		success: true,
	});
};

const removeHotelById = async (req: Request, res: Response) => {
	const hotel = await hotelService.removeHotelById(Number(req.params.id));

	res.status(StatusCodes.OK).json({
		message: "Removed the hotel successfully",
		data: hotel,
		success: true,
	});
};

const updateHotel = async (req: Request, res: Response) => {
	const hotel = await hotelService.updateHotel(Number(req.params.id), req.body);

	res.status(StatusCodes.OK).json({
		message: "Updated the hotel successfully",
		data: hotel,
		success: true,
	});
};

export { createHotel, getAllHotels, getHotelById, removeHotelById, updateHotel};
