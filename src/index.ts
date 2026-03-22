import express from "express"
import { serverConfig } from "./config/index.ts"
import v1Router from "./routers/v1/index.router.ts"
import { errorHandler } from "./middlewares/error.middleware.ts"
import { attachCorrelationId } from "./middlewares/correlation.middleware.ts"
import { logger } from "./config/logger.config.ts"
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

startServer();