const notes = require("../models/notes");

async function createNotes(title, content, tags, favourite) {
  const note = new notes({
    title,
    content: content || "",
    tags: tags || [],
    favorite: favourite || false,
  });
  await note.save();
}

async function getAllNotes(q, tags) {
  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
    ];
  }

  if (tags) {
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    filter.tags = { $in: tagsArray };
  }

  return await notes.find(filter);
}

async function getNotesById(id) {
  const note = await notes.findById(id);
  if (!note) {
    throw new Error("Note not found");
  }
  return note;
}
async function findBookmarkOrThrow(id) {
  const bookmark = await bookmarkModel.findById(id);
  if (!bookmark) {
    throw new Error("Bookmark not found");
  }
  return bookmark;
}
async function findNotesOrThrow(id) {
  const note = await notes.findById(id);
  if (!note) {
    throw new Error("Note not found");
  }
  return note;
}

async function updateNotes(id, updateData) {
  const note = await notes.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    throw new Error("Note not found");
  }
  return note;
}

async function deleteNote(id) {
  const note = await notes.findByIdAndDelete(id);
  if (!note) {
    throw new Error("Note not found");
  }
  return note;
}

module.exports = {
  createNotes,
  getAllNotes,
  getNotesById,
  updateNotes,
  deleteNote,
  findNotesOrThrow,
};
