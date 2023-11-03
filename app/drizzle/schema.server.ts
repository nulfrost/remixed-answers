import {
  pgTable,
  varchar,
  text,
  serial,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: varchar("id", { length: 24 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").notNull().primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  userId: text("user_id").notNull(),
  categoryId: integer("category_id").notNull(),
});

export const answers = pgTable("answers", {
  id: serial("id").notNull().primaryKey(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  questionId: integer("question_id").notNull(),
  userId: text("user_id").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").notNull().primaryKey(),
  name: text("name"),
});

// relations
export const questionsRelations = relations(questions, ({ many, one }) => ({
  answers: many(answers),
  category: one(categories, {
    fields: [questions.categoryId],
    references: [categories.id],
  }),
  author: one(users, {
    fields: [questions.userId],
    references: [users.id],
  }),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  author: one(users, {
    fields: [answers.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  questions: many(questions),
}));
