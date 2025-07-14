const express = require("express");
const notesRouter = express.Router();
const {
  createNotesController,
  getAllNotesController,
  getNotesByIdController,
  updateNotesController,
  deleteNotesController,
  makeFavouriteNoteController,
  getAllTagsController,
  getDashboardController,
} = require("../controller/notes.controller");
notesRouter.get("/tags", getAllTagsController);
notesRouter.get("/stats", getDashboardController);

notesRouter.post("/", createNotesController);
notesRouter.get("/", getAllNotesController);
notesRouter.get("/:id", getNotesByIdController);
notesRouter.put("/:id", updateNotesController);
notesRouter.delete("/:id", deleteNotesController);
notesRouter.post("/:id", makeFavouriteNoteController);

module.exports = notesRouter;
