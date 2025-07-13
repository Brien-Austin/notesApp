const {
  createNotes,
  getAllNotes,
  getNotesById,
  updateNotes,
  deleteNote,
  findNotesOrThrow,
} = require("../services/notes.service");

async function createNotesController(req, res) {
  const { title, content, tags, favourite } = req.body;
  try {
    await createNotes(title, content, tags, favourite);
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
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

async function getNotesByIdController(req, res) {
  const { id } = req.params;
  await findNotesOrThrow(id);
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
  try {
    await updateNotes(id, { title, content, tags, favorite });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
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

module.exports = {
  createNotesController,
  getAllNotesController,
  getNotesByIdController,
  updateNotesController,
  deleteNotesController,
};
