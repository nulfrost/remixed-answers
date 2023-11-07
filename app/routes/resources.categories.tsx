import { json } from "@remix-run/node";
import { db } from "~/drizzle/config.server";
import { categories } from "~/drizzle/schema.server";

export async function loader() {
  const allCategories = await db.select().from(categories);
  return json(allCategories);
}
