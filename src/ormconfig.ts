import type { DataSourceOptions } from "typeorm";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const dbConfig: Partial<DataSourceOptions> = {
  entityPrefix: "",
  entitySkipConstructor: true,
  migrationsTableName: "app_migrations",
  metadataTableName: "typeorm-metas",
  maxQueryExecutionTime: 5000,
  type: isDev ? "sqlite" : "postgres",
  database: isDev ? "my-db.sqlite" : "meeting-db",
  logging: isDev ? ["query", "migration", "error"] : false,
  migrations: ["**/migrations/*.js"],
  entities: ["**/*.entity.js"],
  migrationsRun: true,
  dropSchema: false,
  synchronize: false
};

export default dbConfig as DataSourceOptions;
