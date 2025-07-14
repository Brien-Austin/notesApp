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
} = require("../controller/notes.controller");
const { makeFavourite } = require("../services/notes.service");

notesRouter.post("/notes", createNotesController);
notesRouter.get("/notes", getAllNotesController);
notesRouter.get("/notes/:id", getNotesByIdController);
notesRouter.put("/notes/:id", updateNotesController);
notesRouter.delete("/notes/:id", deleteNotesController);
notesRouter.post("/notes/:id", makeFavouriteNoteController);
notesRouter.get("/tags", getAllTagsController);

module.exports = notesRouter;
