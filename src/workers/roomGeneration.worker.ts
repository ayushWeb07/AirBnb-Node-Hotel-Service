import { Worker, Job } from "bullmq";
import { serverConfig } from "../config/index.ts";
import { RedisConnection } from "../config/redis.config.ts";
import { logger } from "../config/logger.config.ts";
import type { createRoomGenerationJob } from "../dtos/roomGeneration.dto.ts";
import * as roomGenerationService from "../services/roomGeneration.service.ts";

const setupRoomGenerationWorker = async () => {
    const roomGenerationWorker = new Worker(
        serverConfig.BULLMQ_ROOM_GENERATION_QUEUE_NAME,
        async (job: Job) => {
            logger.info(`Processing the room generation job...`);

            const payload: createRoomGenerationJob = job.data;

            // call the room generation service
            await roomGenerationService.createRoomGenerationJob(payload);
        },
        {
            connection: RedisConnection.getConnectionObject(),
        },
    );

    roomGenerationWorker.on("completed", (job: Job) => {
        logger.info(
            `New rooms were created successfully`,
        );
    });

    roomGenerationWorker.on(
        "failed",
        (job: Job | undefined, error: Error, prev: string) => {
            throw error;
        },
    );
};

export { setupRoomGenerationWorker };
