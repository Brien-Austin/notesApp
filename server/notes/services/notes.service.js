const { createTags } = require("../../common/services/common.services");
const notes = require("../models/notes.model");

async function createNotes(title, content, tags = [], favorite, userId) {
  let tagIds = [];

  if (Array.isArray(tags) && tags.length > 0) {
    const valid = tags.every(
      (tag) => typeof tag === "string" && tag.trim() !== ""
    );
    if (!valid) throw new Error("Tags must be a non-empty array of strings");

    const tagDocs = await createTags(tags);
    tagIds = tagDocs.map((tag) => tag._id);
  }

  const note = new notes({
    user: userId,
    title,
    content: content || "",
    tags: tagIds,
    isFavorite: favorite || false,
  });

  await note.save();
  return note;
}

async function getAllNotes(q, tags, userId) {
  const filter = { user: userId };

  if (typeof q === "string" && q.trim()) {
    const keyword = q.trim();
    filter.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  if (typeof tags === "string" && tags.trim()) {
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (tagList.length > 0) filter.tags = { $in: tagList };
  }

  return await notes.find(filter).populate("tags", "_id name").lean();
}

async function getNotesById(id, userId) {
  const note = await notes
    .findOne({ _id: id, user: userId })
    .populate("tags", "_id name");
  if (!note) throw new Error("Note not found");
  return note;
}

async function findNotesOrThrow(id, userId) {
  const note = await notes.findOne({ _id: id, user: userId });
  if (!note) throw new Error("Note not found");
  return note;
}

async function updateNotes(id, updateData, userId) {
  const note = await notes.findOneAndUpdate(
    { _id: id, user: userId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) throw new Error("Note not found");
  return note;
}

async function deleteNote(id, userId) {
  const note = await notes.findOneAndDelete({ _id: id, user: userId });
  if (!note) throw new Error("Note not found");
  return note;
}

async function makeFavourite(id, userId) {
  const note = await notes.findOne({ _id: id, user: userId });
  if (!note) throw new Error("Note not found");

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
