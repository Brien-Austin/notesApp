const { findOrCreateTagsByName } = require("../../common/services/tag.service");
const {
  createBookmark,
  getAllBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
  findBookmarkOrThrow,
  makeFavourite,
} = require("../services/bookmark.service");

async function createBookmarkController(req, res) {
  const { url, title, tags } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    await createBookmark(url, title, tags);
    res.status(201).json({ message: "Bookmark created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Failed to create bookmark" });
  }
}

async function getAllBookmarksController(req, res) {
  try {
    const bookmarks = await getAllBookmarks(req.query);
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
}

async function getBookmarkByIdController(req, res) {
  const { id } = req.params;
  try {
    const bookmark = await findBookmarkOrThrow(id);

    res.status(200).json(bookmark);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateBookmarkController(req, res) {
  const { id } = req.params;
  const { url, title, tags } = req.body;

  try {
    await findBookmarkOrThrow(id);

    const tagDocs = await findOrCreateTagsByName(tags);
    const tagIds = tagDocs.map((tag) => tag._id);

    const updatedBookmark = await updateBookmark(id, {
      url,
      title,
      tags: tagIds,
    });

    res.status(200).json({
      message: "Bookmark updated successfully",
      updatedBookmark,
    });
  } catch (error) {
    console.error(error);
    const status = error.message === "Bookmark not found" ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
}

async function deleteBookmarkController(req, res) {
  const { id } = req.params;
  try {
    await findBookmarkOrThrow(id);
    await deleteBookmark(id);
    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    const status = error.message === "Bookmark not found" ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
}

async function makeFavouriteBookMarkController(req, res) {
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
  createBookmarkController,
  getAllBookmarksController,
  getBookmarkByIdController,
  updateBookmarkController,
  deleteBookmarkController,
  makeFavouriteBookMarkController,
};
