import { Queue } from "bullmq";
import { RedisConnection } from "../config/redis.config.ts";
import { serverConfig } from "../config/index.ts";

const roomGenerationQueue = new Queue(
	serverConfig.BULLMQ_ROOM_GENERATION_QUEUE_NAME,
	{
		connection: RedisConnection.getConnectionObject(),
	},
);

export { roomGenerationQueue };
