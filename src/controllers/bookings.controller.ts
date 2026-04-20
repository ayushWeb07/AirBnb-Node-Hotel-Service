import type { Request, Response } from "express";
import * as bookingService from "../services/booking.service.ts";

import {
    StatusCodes
} from 'http-status-codes';

const create = async (req: Request, res: Response) => {
    const booking = await bookingService.create(req.body);

    res.status(StatusCodes.CREATED).json({
        message: "New booking was added successfully",
        data: booking,
        success: true
    });
};

const getAll = async (req: Request, res: Response) => {
    const bookings = await bookingService.getAll();

    res.status(StatusCodes.OK).json({
        message: "Fetched all the bookings successfully",
        data: bookings,
        success: true
    });
};


export { create, getAll };
