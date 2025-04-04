import { eq } from "drizzle-orm";
import { db } from "../db";
import { notesTable, UpdateNoteData } from "../db/schema/notes";
import AppError from "../middleware/errorHandler";
import { blocksTable } from "../db/schema/blocks";

export const getAllNotesService = async () => {
  try {
    const allNotes = await db.select().from(notesTable);
    return allNotes;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};

export const getNoteByIdService = async (noteId: string) => {
  try {
    const singleNote = await db.select().from(notesTable).where(eq(notesTable.id, noteId));

    if (singleNote.length === 0) {
      return [];
    } else {
      return singleNote[0];
    }
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};

export const insertNoteIntoDbService = async ({ noteTitle }: { noteTitle: string }) => {
  try {
    const createdNote = await db.insert(notesTable).values({ noteTitle }).returning();
    return createdNote;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};

export const updateNoteService = async ({ noteTitle, blocks, id }: UpdateNoteData) => {
  try {
    const updatedNote = await db.update(notesTable).set({ noteTitle: noteTitle, blocks: blocks }).where(eq(notesTable.id, id)).returning();
    console.log(updatedNote);
    return updatedNote;
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};

export const deleteNoteByIdService = async (noteId: string) => {
  try {
    const deletedNote = await db.delete(notesTable).where(eq(notesTable.id, noteId)).returning();
    return deletedNote;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};
