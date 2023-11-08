import { db } from "~/drizzle/config.server";

export async function getAllQuestions() {
  return db.query.questions.findMany({
    with: {
      category: true,
    },
  });
}
