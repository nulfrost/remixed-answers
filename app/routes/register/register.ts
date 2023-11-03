import { db } from "~/drizzle/config.server";
import { users } from "~/drizzle/schema.server";
import { eq } from "drizzle-orm";

type User = typeof users.$inferInsert;

export async function registerUser(user: User) {
  return db.insert(users).values(user);
}

export async function checkIfUserEmailExists(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (user.length === 0) return true;
  return false;
}
