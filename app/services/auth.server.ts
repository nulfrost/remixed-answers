import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { users } from "~/drizzle/schema.server";
import { db } from "~/drizzle/config.server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

type User = Omit<
  typeof users.$inferInsert,
  "password" | "created_at" | "email"
>;

export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: "__session",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    const user = await verifyLogin(username, password);

    if (!user) throw new Error("Invalid username or password");

    return user;
  }),
  "form"
);

async function verifyLogin(username: string, password: string) {
  const user = await db
    .select({
      id: users.id,
      username: users.username,
      password: users.password,
    })
    .from(users)
    .where(eq(users.username, username));
  if (!user.length) return null;
  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) return null;

  return {
    id: user[0].id,
    username: user[0].username,
  };
}

export async function authenticate(request: Request) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
