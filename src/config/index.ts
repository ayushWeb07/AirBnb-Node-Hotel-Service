import "dotenv/config";

interface ServerConfig {
  PORT: number;
}

interface DbConfig {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
}

const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) ?? 3000,
};

const dbConfig: DbConfig = {
  DB_USER: process.env.DB_USER ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "root",
  DB_NAME: process.env.DB_NAME ?? "airbnb_dev",
  DB_HOST: process.env.DB_HOST ?? "localhost",
};

export { serverConfig, dbConfig };
