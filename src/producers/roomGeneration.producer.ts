import { roomGenerationQueue } from "../queues/roomGeneration.queue.ts";
import type { createRoomGenerationJob } from "../dtos/roomGeneration.dto.ts";
import { logger } from "../config/logger.config.ts";
import { serverConfig } from "../config/index.ts";

const addJobToRoomGenerationQueue = async (
	payload: createRoomGenerationJob,
) => {
	try {
		await roomGenerationQueue.add(
			serverConfig.BULLMQ_ROOM_GENERATION_PAYLOAD_NAME,
			payload,
			{
				attempts: serverConfig.BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_ATTEMPTS,
				backoff: {
					type: "exponential",
					delay: serverConfig.BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_DELAY,
				},
			},
		);
		logger.info(
			`Successfully added the room generation job to queue: ${JSON.stringify(payload)}`,
		);
	} catch (error) {
		logger.error("Failed to add the room generation job to queue", error);
	}
};

export { addJobToRoomGenerationQueue };
