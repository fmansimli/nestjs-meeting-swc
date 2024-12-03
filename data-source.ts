import { DataSource } from "typeorm";
import ormConfig from "./src/ormconfig";

const dataSource = new DataSource(ormConfig);

export default dataSource;
