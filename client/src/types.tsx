import { z } from "zod";

export const notesTableSchema = z.object({
  id: z.string({ message: "Note id required" }).uuid({ message: "Not a valid uuid" }),
  noteTitle: z.string({ message: "Note title required" }).max(255, { message: "255 maximum characters allowed" }),
  blocks: z.array(z.object({})),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type NotesData = z.infer<typeof notesTableSchema>;

export const updateNoteSChema = z.object({
  id: z.string({ message: "Note id required" }).uuid({ message: "Not a valid uuid" }),
  noteTitle: z.string({ message: "Note title required" }).max(255, { message: "255 maximum characters allowed" }),
  blocks: z.array(z.object({})),
});

export type UpdateNoteData = z.infer<typeof updateNoteSChema>;

export const blocksTableSchema = z.object({
  id: z.string({ message: "Id required" }).uuid({ message: "Not a valid UUID" }),
  type: z.enum(["text", "image", "to-do", "paragraph"], { message: "Invalid type" }),
  properties: z.object({ title: z.string() }),
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
});

export type BlockData = z.infer<typeof blocksTableSchema>;

export const updateBlockSchema = z.object({
  id: z.string({ message: "Id required" }).uuid({ message: "Not a valid UUID" }),
  type: z.enum(["text", "image", "to-do", "paragraph"], { message: "Invalid type" }),

  properties: z.object({ title: z.string() }),
});

export type UpdateBlockData = z.infer<typeof updateBlockSchema>;

export const createBlockSchema = z.object({
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
  type: z.enum(["text", "image", "to-do", "paragraph"], { message: "Invalid type" }),

  properties: z.object({ title: z.string() }),
});

export type CreateBlockData = z.infer<typeof createBlockSchema>;

export const noteTableSchema = z.object({
  id: z.string({ message: "Note id required" }).uuid({ message: "Not a valid uuid" }),
  noteTitle: z.string({ message: "Note title required" }).max(255, { message: "255 maximum characters allowed" }),
  blocks: z.array(blocksTableSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type NoteData = z.infer<typeof noteTableSchema>;
