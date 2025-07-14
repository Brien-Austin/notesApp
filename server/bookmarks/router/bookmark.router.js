const express = require("express");
const {
  createBookmarkController,
  getAllBookmarksController,
  getBookmarkByIdController,
  updateBookmarkController,
  deleteBookmarkController,
  makeFavouriteBookMarkController,
} = require("../controller/bookmark.controller");
const bookmarksRouter = express.Router();
bookmarksRouter.post("/", createBookmarkController);
bookmarksRouter.get("/", getAllBookmarksController);
bookmarksRouter.get("/:id", getBookmarkByIdController);
bookmarksRouter.put("/:id", updateBookmarkController);
bookmarksRouter.delete("/:id", deleteBookmarkController);
bookmarksRouter.post("/:id", makeFavouriteBookMarkController);

module.exports = bookmarksRouter;
