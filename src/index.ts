import express from "express";
import v1Router from "./routers/v1/index.router.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import { attachCorrelationId } from "./middlewares/correlation.middleware.ts";
import { startServer } from "./utils/server/startServer.ts";
import { sendHeartBeatPings } from "./utils/server/sendHeartBeatPings.ts";
import { registerShutdownHandlers } from "./config/shutdown.config.ts";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { roomGenerationQueue } from "./queues/roomGeneration.queue.ts";

// config app
const app = express();

// config bull mq dashboard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
	queues: [new BullMQAdapter(roomGenerationQueue)],
	serverAdapter: serverAdapter,
});

// setup global middlewares
app.use(express.json());
app.use(attachCorrelationId);

// setup version routes
app.use("/api/v1", v1Router);
app.use("/admin/queues", serverAdapter.getRouter());

// setup the error middleware
app.use(errorHandler);

// spin up the server + DB
startServer(app);

// send heartbeat pings with 5m interval
setInterval(sendHeartBeatPings, 5 * 60 * 1000);

// Ensure that all logs are sent to Logtail
registerShutdownHandlers();
