const express = require("express");
const {
  createBookmarkController,
  getAllBookmarksController,
  getBookmarkByIdController,
  updateBookmarkController,
  deleteBookmarkController,
} = require("../controller/bookmark.controller");
const bookmarksRouter = express.Router();

bookmarksRouter.post("/bookmarks", createBookmarkController);
bookmarksRouter.get("/bookmarks", getAllBookmarksController);
bookmarksRouter.get("/bookmarks/:id", getBookmarkByIdController);
bookmarksRouter.put("/bookmarks/:id", updateBookmarkController);
bookmarksRouter.delete("/bookmarks/:id", deleteBookmarkController);

module.exports = bookmarksRouter;
