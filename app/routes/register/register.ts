import { db } from "~/drizzle/config.server";
import { users } from "~/drizzle/schema.server";

type User = typeof users.$inferInsert;

export async function registerUser(user: User) {
  return db.insert(users).values(user);
}
