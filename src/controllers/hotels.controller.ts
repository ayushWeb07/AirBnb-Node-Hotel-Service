import type { Request, Response } from "express";
import * as hotelService from "../services/hotel.service";

const create = async (req: Request, res: Response) => {
  const hotel = await hotelService.create(req.body);

  res.status(201).json({
    message: "New hotel was added successfully",
    data: hotel,
    success: true
  });
};

const getAll = async (req: Request, res: Response) => {
  const hotels = await hotelService.getAll();

  res.status(200).json({
    message: "Fetched all the hotels successfully",
    data: hotels,
    success: true
  });
};

const getById = async (req: Request, res: Response) => {
  const hotel = await hotelService.getById(Number(req.params.id));

  res.status(200).json({
    message: "Fetched the hotel successfully",
    data: hotel,
    success: true
  });
};

const remove = async (req: Request, res: Response) => {
  const hotel = await hotelService.remove(Number(req.params.id));

  res.status(200).json({
    message: "Removed the hotel successfully",
    data: hotel,
    success: true
  });
};

const update = async (req: Request, res: Response) => {
  const hotel = await hotelService.update(Number(req.params.id), req.body);

  res.status(200).json({
    message: "Updated the hotel successfully",
    data: hotel,
    success: true
  });
};

export { create, getAll, getById, remove, update };
