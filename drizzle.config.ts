import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./app/drizzle/schema.server.ts",
  out: "./app/drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
