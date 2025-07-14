const tagModel = require("../../common/models/tag.model");
const {
  createTags,
  findOrCreateTagsByName,
  getAllTags,
  getDashboardStats,
  getRecentActivity,
} = require("../../common/services/common.services");
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
  const userId = req.user.id;

  try {
    await createNotes(title, content, tags, favourite, userId);
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create note" });
  }
}

async function getAllNotesController(req, res) {
  const { q, tags } = req.query;
  const userId = req.user.id;
  console.log("useridd" + userId);
  console.log("userid" + userId);

  try {
    const notes = await getAllNotes(q, tags, userId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

async function getNotesByIdController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const note = await getNotesById(id, userId);
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateNotesController(req, res) {
  const { id } = req.params;
  const { title, content, tags, favorite } = req.body;
  const userId = req.user.id;

  try {
    await findNotesOrThrow(id, userId);
    const tagDocs = await findOrCreateTagsByName(tags);
    const tagIds = tagDocs.map((tag) => tag._id);

    const updatedNote = await updateNotes(
      id,
      { title, content, tags: tagIds, favorite },
      userId
    );
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function getDashboardController(req, res) {
  try {
    const userId = req.user.id;
    const userName = req.user.email;

    const [stats, recentActivity] = await Promise.all([
      getDashboardStats(userId),
      getRecentActivity(userId, 5),
    ]);

    res.status(200).json({
      userName,
      stats,
      recentActivity,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
}

async function deleteNotesController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await deleteNote(id, userId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function makeFavouriteNoteController(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await makeFavourite(id, userId);
    res.status(200).json({ message: "Toggled Favourite" });
  } catch (error) {
    res.status(404).json({ error: error.message });
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

module.exports = {
  createNotesController,
  getAllNotesController,
  getNotesByIdController,
  updateNotesController,
  deleteNotesController,
  makeFavouriteNoteController,
  getAllTagsController,
  getDashboardController,
};
