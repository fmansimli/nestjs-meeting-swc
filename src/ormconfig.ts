import type { DataSourceOptions } from "typeorm";

const isDev = process.env.NODE_ENV === "development";

const dbConfig: Partial<DataSourceOptions> = {
  entityPrefix: "",
  entitySkipConstructor: true,
  migrationsTableName: "app_migrations",
  metadataTableName: "typeorm-metas",
  maxQueryExecutionTime: 5000,
  type: isDev ? "sqlite" : "postgres",
  database: isDev ? "mydb.sqlite" : "meetingdb",
  logging: isDev ? ["query", "migration", "error"] : false,
  migrations: ["**/migrations/*.js"],
  entities: ["**/*.entity.js"],
  migrationsRun: false,
  synchronize: false,
  dropSchema: false
};

export default dbConfig as DataSourceOptions;
