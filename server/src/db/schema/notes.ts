import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const notesTable = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  noteTitle: varchar("note_title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => Date.now().toString()),
});

export const notesTableSchema = z.object({
  id: z.string({ message: "Note id required" }).uuid({ message: "Not a valid uuid" }),
  noteTitle: z.string({ message: "Note title required" }).max(255, { message: "255 maximum characters allowed" }),
  createdAt: z.string(),
  updatedAt: z.string(),
});
