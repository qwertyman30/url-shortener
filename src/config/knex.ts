// import "dotenv/config";
import Knex from "knex";

const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

console.log("knex.ts", DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB);

const knex = Knex({
    client: "postgresql",
    connection: {
        host: DB_HOST,
        port: Number(DB_PORT),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    },
});

export const onDatabaseConnect = async () => knex.raw("SELECT 1");

export default knex;