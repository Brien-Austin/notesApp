const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const notesRouter = require("./notes/router/notes.router.js");
const bookmarksRouter = require("./bookmarks/router/bookmark.router.js");
const app = express();
const PORT = process.env.PORT || 3005;
app.use(cors());
app.use(express.json());
app.use("/api", notesRouter);
app.use("/api", bookmarksRouter);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
