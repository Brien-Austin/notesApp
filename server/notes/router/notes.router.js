const express = require("express");
const notesRouter = express.Router();
const {
  createNotesController,
  getAllNotesController,
  getNotesByIdController,
  updateNotesController,
  deleteNotesController,
} = require("../controller/notes.controller");

notesRouter.post("/notes", createNotesController);
notesRouter.get("/notes", getAllNotesController);
notesRouter.get("/notes/:id", getNotesByIdController);
notesRouter.put("/notes/:id", updateNotesController);
notesRouter.delete("/notes/:id", deleteNotesController);

module.exports = notesRouter;
