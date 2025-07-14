const { createTags } = require("../../common/services/tag.service");
const notes = require("../models/notes");

async function createNotes(title, content, tags = [], favorite) {
  let tagIds = [];

  if (Array.isArray(tags) && tags.length > 0) {
    const valid = tags.every(
      (tag) => typeof tag === "string" && tag.trim() !== ""
    );
    if (!valid) {
      throw new Error("Tags must be a non-empty array of strings");
    }

    const tagDocs = await createTags(tags);
    tagIds = tagDocs.map((tag) => tag._id);
  }

  const note = new notes({
    title,
    content: content || "",
    tags: tagIds,
    favorite: favorite || false,
  });

  await note.save();
  return note;
}

async function getAllNotes(q, tags) {
  const filter = {};

  //search
  if (typeof q === "string" && q.trim()) {
    const keyword = q.trim();
    filter.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  // tag
  if (typeof tags === "string" && tags.trim()) {
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (tagList.length > 0) {
      filter.tags = { $in: tagList };
    }
  }

  try {
    const results = await notes
      .find(filter)
      .populate("tags", "_id name")
      .lean();

    return results;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
}

async function getNotesById(id) {
  const note = await notes.findById(id).populate("tags", "_id name");
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

async function makeFavourite(id) {
  const note = await notes.findById(id);
  note.isFavorite = !note.isFavorite;
  await note.save();
  return note;
}

module.exports = {
  createNotes,
  getAllNotes,
  getNotesById,
  updateNotes,
  deleteNote,
  findNotesOrThrow,
  makeFavourite,
};
