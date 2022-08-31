import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const databaseConfig = {
  user: "postgres",
  password: "" ,
  host: "localhost",
  port: "5432",
  database: "",
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = new Pool(databaseConfig);

export default connection