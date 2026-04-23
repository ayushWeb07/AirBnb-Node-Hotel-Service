import "dotenv/config";

interface ServerConfig {
  PORT: number;
  BETTERSTACK_HEARTBEAT_URL: string;
  LOGTAIL_SOURCE_TOKEN: string;
  LOGTAIL_URL: string;
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
};

const dbConfig: DbConfig = {
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "airbnb_dev",
  DB_HOST: process.env.DB_HOST || "localhost",
};

export { serverConfig, dbConfig };
