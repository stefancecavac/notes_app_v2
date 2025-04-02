import { NextFunction, Request, Response } from "express";
import { deleteNoteByIdService, getAllNotesService, getNoteByIdService, insertNoteIntoDbService } from "../service/notesService";
import AppError from "../middleware/errorHandler";

export const getAllNotesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allNotes = await getAllNotesService();

    res.status(200).json(allNotes);
  } catch (error) {
    next(error);
  }
};

export const getSingleNoteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const singleNote = await getNoteByIdService(id);

    if (!singleNote) {
      return next(new AppError("Note with that id doesnt exist", 404));
    }

    res.status(200).json(singleNote);
  } catch (error) {
    next(error);
  }
};

export const createNotecontroller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteTitle } = req.body;
    const allNotes = await insertNoteIntoDbService({ noteTitle });
    res.status(200).json(allNotes);
  } catch (error) {
    next(error);
  }
};

export const deleteNoteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const noteToDelete = await getNoteByIdService(id);
    console.log(noteToDelete);
    if (!noteToDelete) {
      return next(new AppError("Note with that id doesnt exist", 404));
    }

    const deleteNote = await deleteNoteByIdService(id);
    res.status(200).json(deleteNote);
  } catch (error) {
    next(error);
  }
};
