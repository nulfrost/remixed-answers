import { categories } from "./schema.server.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";

const queryClient = postgres(
  "postgres://postgres:password@0.0.0.0:5432/remixedanswersdb"
);
export const db = drizzle(queryClient);

async function main() {
  await db.execute(sql`TRUNCATE TABLE categories RESTART IDENTITY;`);
  await db
    .insert(categories)
    .values([
      { name: "Science" },
      { name: "Hobbies" },
      { name: "Health" },
      { name: "Automotive" },
    ]);
}

main()
  .then(() => {
    console.log("Finished seeding Database ✨");
    process.exit(0);
  })
  .catch((e) => console.error(e));
