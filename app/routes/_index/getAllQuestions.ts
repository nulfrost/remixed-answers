import { db } from '~/drizzle/config.server'

export async function getAllQuestions(searchTerm: string) {
   return db.query.questions.findMany({
      with: {
         category: true,
      },
      where: (questions, { ilike }) =>
         ilike(questions.title, `%${searchTerm}%`),
   })
}
