import "dotenv/config";

interface ServerConfig {
	PORT: number;
	BETTERSTACK_HEARTBEAT_URL: string;
	LOGTAIL_SOURCE_TOKEN: string;
	LOGTAIL_URL: string;
	SENTRY_DSN: string;
	REDIS_SERVER_HOST: string;
	REDIS_SERVER_PORT: number;
	BULLMQ_ROOM_GENERATION_QUEUE_NAME: string;
	BULLMQ_ROOM_GENERATION_PAYLOAD_NAME: string;
	BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_ATTEMPTS: number;
	BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_DELAY: number;
}

interface DbConfig {
	DB_USER: string;
	DB_PASSWORD: string;
	DB_NAME: string;
	DB_HOST: string;
}

const serverConfig: ServerConfig = {
	PORT: Number(process.env.PORT) || 3000,
	BETTERSTACK_HEARTBEAT_URL: process.env.BETTERSTACK_HEARTBEAT_URL || "",
	LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN || "",
	LOGTAIL_URL: process.env.LOGTAIL_URL || "",
	SENTRY_DSN: process.env.SENTRY_DSN || "",
	REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST || "localhost",
	REDIS_SERVER_PORT: Number(process.env.REDIS_SERVER_PORT) || 6379,
	BULLMQ_ROOM_GENERATION_QUEUE_NAME:
		process.env.BULLMQ_ROOM_GENERATION_QUEUE_NAME || "",
	BULLMQ_ROOM_GENERATION_PAYLOAD_NAME:
		process.env.BULLMQ_ROOM_GENERATION_PAYLOAD_NAME || "",
	BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_ATTEMPTS:
		Number(process.env.BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_ATTEMPTS) || 3,
	BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_DELAY:
		Number(process.env.BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_DELAY) || 1000,
};

const dbConfig: DbConfig = {
	DB_USER: process.env.DB_USER || "root",
	DB_PASSWORD: process.env.DB_PASSWORD || "",
	DB_NAME: process.env.DB_NAME || "airbnb_dev",
	DB_HOST: process.env.DB_HOST || "localhost",
};

export { serverConfig, dbConfig };
