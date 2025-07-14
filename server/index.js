const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const notesRouter = require("./notes/router/notes.router.js");
const bookmarksRouter = require("./bookmarks/router/bookmark.router.js");
const authRouter = require("./auth/router/auth.router.js");
const { authenticate } = require("./middleware/auth.middleware.js");
const app = express();
const PORT = process.env.PORT || 3005;
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);

app.use("/api/notes", authenticate, notesRouter);
app.use("/api/bookmarks", authenticate, bookmarksRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
