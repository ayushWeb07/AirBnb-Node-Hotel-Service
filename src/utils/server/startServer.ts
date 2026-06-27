import sequelize from "../../db/models/sequelize.ts";
import { logger } from "../../config/logger.config.ts";
import { serverConfig } from "../../config/index.ts";
import type { Express } from "express";
import { setupRoomGenerationWorker } from "../../workers/roomGeneration.worker.ts";

const startServer = async (app: Express) => {
	try {
		await sequelize.authenticate();
		logger.info("Successfully connected to the DB");

		app.listen(serverConfig.PORT, async () => {
			logger.info(`Server listening on http://localhost:${serverConfig.PORT}`);

			await setupRoomGenerationWorker();
			logger.info(`Successfully completed the room generation worker setup`);
		});
	} catch (error) {
		logger.error("Unable to connect to the database:", error);
		process.exit(1);
	}
};

export { startServer };
