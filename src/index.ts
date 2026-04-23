import express from "express"
import { serverConfig } from "./config/index.ts"
import v1Router from "./routers/v1/index.router.ts"
import { errorHandler } from "./middlewares/error.middleware.ts"
import { attachCorrelationId } from "./middlewares/correlation.middleware.ts"
import { logtail, logger } from "./config/logger.config.ts"
import sequelize from "./db/models/sequelize.ts"

// config app
const app = express()

// setup global middlewares
app.use(express.json())
app.use(attachCorrelationId)

// setup version routes
app.use("/api/v1", v1Router)

// setup the error middleware
app.use(errorHandler)

// spin up the server + DB
const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Successfully connected to the DB");

    app.listen(serverConfig.PORT, () => {
      logger.info(`Server listening on http://localhost:${serverConfig.PORT}`);
    });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

// send heartbeat pings to betterstack with 5m time period
const sendHeartBeatPings = async () => {
  try {
    await fetch(serverConfig.BETTERSTACK_HEARTBEAT_URL)
    logger.info("Successfully pinged the heartbeat")
  } catch (error) {
    logger.error("Failed to ping the heartbeat", error);
  }
}

startServer();

setInterval(sendHeartBeatPings, 5 * 60 * 1000);

// Ensure that all logs are sent to Logtail

// Graceful shutdown
process.on('SIGTERM', async () => {
  await logtail.flush();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await logtail.flush();
  process.exit(0);
});

// Uncaught errors
process.on('uncaughtException', async (err) => {
  logger.error('Uncaught exception', { error: err });
  await logtail.flush();
  process.exit(1);
});

process.on('unhandledRejection', async (reason) => {
  logger.error('Unhandled rejection', { error: reason });
  await logtail.flush();
  process.exit(1);
});