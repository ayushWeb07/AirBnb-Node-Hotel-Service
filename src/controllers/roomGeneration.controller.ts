import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { addJobToRoomGenerationQueue } from "../producers/roomGeneration.producer.ts";

const createRoomGenerationJob = async (req: Request, res: Response) => {
	// enqueue the job into the queue
	await addJobToRoomGenerationQueue(req.body);

	res.status(StatusCodes.CREATED).json({
		message: "New rooms were created successfully",
		success: true,
	});
};
export { createRoomGenerationJob };
