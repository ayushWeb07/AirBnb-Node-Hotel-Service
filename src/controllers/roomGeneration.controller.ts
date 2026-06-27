import type { Request, Response } from "express";
import * as roomGenerationService from "../services/roomGeneration.service.ts";

import { StatusCodes } from "http-status-codes";

const createRoomGenerationJob = async (req: Request, res: Response) => {
	const roomGenerationJob = await roomGenerationService.createRoomGenerationJob(
		req.body,
	);

	res.status(StatusCodes.CREATED).json({
		message: "New rooms were created successfully",
		data: roomGenerationJob,
		success: true,
	});
};
export { createRoomGenerationJob };
