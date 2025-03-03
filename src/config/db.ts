// import postgres from "postgres";
// import * as dotenv from "dotenv";

// dotenv.config();

// const sql = postgres(process.env.DATABASE_URL!, {
//     ssl: "require", 
// });

// export default sql;


import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!, {
    ssl: "require", 
});

const checkConnection = async () => {
    try {
        await sql`SELECT 1`;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

export { sql, checkConnection };