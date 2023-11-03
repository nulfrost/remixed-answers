import { db } from "~/drizzle/config.server";
import { users } from "~/drizzle/schema.server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  return bcrypt.hash(password, 15);
}

type User = typeof users.$inferInsert;

export async function registerUser(user: User) {
  const hashedPassword = await hashPassword(user.password);
  return db.insert(users).values({ ...user, password: hashedPassword });
}

export async function checkIfEmailExists(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (user.length === 0) return true;
  return false;
}

export async function checkIfUsernameExists(username: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  if (user.length === 0) return true;
  return false;
}
