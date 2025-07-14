const tagModel = require("../../common/models/tag.model");
const {
  createTags,
  findOrCreateTagsByName,
  getAllTags,
} = require("../../common/services/tag.service");
const {
  createNotes,
  getAllNotes,
  getNotesById,
  updateNotes,
  deleteNote,
  findNotesOrThrow,
  makeFavourite,
} = require("../services/notes.service");

async function createNotesController(req, res) {
  const { title, content, tags, favourite } = req.body;
  try {
    await createNotes(title, content, tags, favourite);
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create note" });
  }
}

async function getAllNotesController(req, res) {
  const { q, tags } = req.query;

  try {
    const notes = await getAllNotes(q, tags);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

async function getAllTagsController(req, res) {
  const { q, tags } = req.query;

  try {
    const allTags = await getAllTags(q, tags);
    res.status(200).json(allTags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch allTags" });
  }
}

async function getNotesByIdController(req, res) {
  const { id } = req.params;
  try {
    const note = await getNotesById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
}

async function updateNotesController(req, res) {
  const { id } = req.params;
  await findNotesOrThrow(id);
  const { title, content, tags, favorite } = req.body;
  const tagDocs = await findOrCreateTagsByName(tags);
  const tagIds = tagDocs.map((tag) => tag._id);

  try {
    await updateNotes(id, { title, content, tags: tagIds, favorite });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update note" });
  }
}

async function deleteNotesController(req, res) {
  const { id } = req.params;
  await findNotesOrThrow(id);
  try {
    await deleteNote(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}

async function makeFavouriteNoteController(req, res) {
  const { id } = req.params;
  try {
    await makeFavourite(id);
    res.status(200).json({
      message: "Toogled Favourites",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createNotesController,
  getAllNotesController,
  getNotesByIdController,
  updateNotesController,
  deleteNotesController,
  makeFavouriteNoteController,
  getAllTagsController,
};
