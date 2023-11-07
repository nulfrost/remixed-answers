import { db } from "~/drizzle/config.server";
import { questions } from "~/drizzle/schema.server";

type Question = Omit<
  typeof questions.$inferInsert,
  "created_at" | "updated_at" | "id"
>;

export async function createQuestion(question: Question) {
  return db.insert(questions).values({
    title: question.title,
    body: question.body,
    userId: question.userId,
    categoryId: 2,
  });
}
