const bookmarkModel = require("../../bookmarks/models/bookmark.model");
const notesModel = require("../../notes/models/notes.model");
const tagModel = require("../models/tag.model");
async function createTags(names) {
  if (!Array.isArray(names) || names.length === 0) {
    throw new Error("Tags must be a non-empty array of strings");
  }

  const uniqueNames = [
    ...new Set(names.map((name) => name.trim().toLowerCase())),
  ];

  const tagDocs = [];

  for (const name of uniqueNames) {
    try {
      let tag = await tagModel.findOne({ name });

      if (!tag) {
        tag = await tagModel.create({ name });
      }

      tagDocs.push(tag);
    } catch (error) {
      console.error(`Error creating tag "${name}":`, error);
      throw error;
    }
  }

  return tagDocs;
}

async function findOrCreateTagsByName(names) {
  return Promise.all(
    names
      .filter((name) => typeof name === "string" && name.trim() !== "")
      .map(async (name) => {
        let tag = await tagModel.findOne({ name });
        if (!tag) {
          tag = await tagModel.create({ name });
        }
        return tag;
      })
  );
}

async function getAllTags() {
  return tagModel.find();
}

async function getDashboardStats(userId) {
  const [noteCount, bookmarkCount] = await Promise.all([
    notesModel.countDocuments({ user: userId }),
    bookmarkModel.countDocuments({ user: userId }),
  ]);

  return {
    notes: noteCount,
    bookmarks: bookmarkCount,
  };
}

async function getRecentActivity(userId, limit = 5) {
  const [recentNotes, recentBookmarks] = await Promise.all([
    notesModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title createdAt tags isFavorite")
      .populate("tags", "_id name"),
    bookmarkModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title url createdAt tags")
      .populate("tags", "_id name"),
  ]);

  return {
    notes: recentNotes,
    bookmarks: recentBookmarks,
  };
}

module.exports = {
  createTags,
  findOrCreateTagsByName,
  getAllTags, 
  getDashboardStats,
  getRecentActivity,
};
