import express from "express";
import {
  createNotecontroller,
  deleteNoteController,
  getAllNotesController,
  getSingleNoteController,
  updateNoteController,
} from "../controllers/notesControllers";
import { validate } from "../middleware/validation";
import { notesTableSchema, updateNoteTableSchema } from "../db/schema/notes";
import blockRouter from "./blockRoutes";

const router = express.Router();

router.use("/block", blockRouter);

router.get("/", getAllNotesController);
router.get("/:id", validate({ params: notesTableSchema.pick({ id: true }) }), getSingleNoteController);
router.post("/", validate({ body: notesTableSchema.pick({ noteTitle: true }) }), createNotecontroller);
router.patch("/update", validate({ body: updateNoteTableSchema.pick({ blocks: true, id: true, noteTitle: true }) }), updateNoteController);

router.delete("/:id", validate({ params: notesTableSchema.pick({ id: true }) }), deleteNoteController);

export default router;
