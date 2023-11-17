import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { categories, users } from "./schema.server.ts";
import bcrypt from "bcryptjs";

const queryClient = postgres(
  "postgres://postgres:password@localhost:5432/remixedanswersdb"
);
export const db = drizzle(queryClient);

async function main() {
  const user = {
    username: "Danex10",
    email: "dane10@gmail.com",
    password: await bcrypt.hash("thisisapassword", 15),
  };
  await Promise.all([
    db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY;`),
    db.execute(sql`TRUNCATE TABLE categories RESTART IDENTITY;`),
    db.execute(sql`TRUNCATE TABLE questions RESTART IDENTITY;`),
    db.execute(sql`TRUNCATE TABLE answers RESTART IDENTITY;`),
    db.insert(users).values(user),
    db
      .insert(categories)
      .values([
        { name: "Science" },
        { name: "Hobbies" },
        { name: "Health" },
        { name: "Automotive" },
      ]),
  ]);
}

main()
  .then(() => {
    console.log("Finished seeding Database ✨");
    process.exit(0);
  })
  .catch((e) => console.error(e));
