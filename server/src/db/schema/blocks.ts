import { jsonb, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { notesTable } from "./notes";
import { z, ZodEnum } from "zod";

export const typeEnum = pgEnum("type", ["text", "image", "to-do"]);

export const blocksTable = pgTable("blocks", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  type: typeEnum().notNull(),
  properties: jsonb().notNull(),

  noteId: uuid("noteId").references(() => notesTable.id, { onDelete: "cascade" }),
});

export const blocksTableSchema = z.object({
  id: z.string({ message: "Id required" }).uuid({ message: "Not a valid UUID" }),
  type: z.enum(["text", "image", "to-do"], { message: "Invalid type" }),
  properties: z.record(z.any(), { message: "Invalid properties" }),
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
});

export const createBlocksTableSchema = z.object({
  type: z.enum(["text", "image", "to-do"], { message: "Invalid type" }),
  properties: z.record(z.any(), { message: "Invalid properties" }),
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
});

export type createBlocksTableType = z.infer<typeof createBlocksTableSchema>;

export const updateBlockTableSchema = z.object({
  type: z.enum(["text", "image", "to-do"], { message: "Invalid type" }),
  properties: z.record(z.any(), { message: "Invalid properties" }),
  id: z.string({ message: "Id required" }).uuid({ message: "Not a valid UUID" }),
});
export type updateBlocksTableType = z.infer<typeof updateBlockTableSchema>;
