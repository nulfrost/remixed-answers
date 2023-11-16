import { eq } from "drizzle-orm";
import { db } from "~/drizzle/config.server";
import { questions } from "~/drizzle/schema.server";

export async function getSingleQuestion(id: number) {
  return db.query.questions.findFirst({
    columns: {
      created_at: true,
      body: true,
      title: true,
      id: true,
    },
    where: eq(questions.id, id),
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      author: {
        columns: {
          username: true,
        },
      },
      answers: {
        with: {
          author: {
            columns: {
              username: true,
            },
          },
        },
      },
    },
  });
}
