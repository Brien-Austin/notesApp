const { createTags } = require("../../common/services/common.services");
const bookmarkModel = require("../models/bookmark.model");
const puppeteer = require("puppeteer");

async function fetchTitleFromUrl(url) {
  let browser;
  try {
    console.log(`Fetching title from: ${url}`);
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });
    const title = await page.title();
    console.log(`Found title: ${title}`);
    return title || "Untitled";
  } catch (error) {
    console.error(`Error fetching title from ${url}:`, error.message);
    return "Untitled";
  } finally {
    if (browser) await browser.close();
  }
}

async function createBookmark(userId, url, title = "", tags = []) {
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

  const bookmark = new bookmarkModel({
    user: userId,
    url,
    title: title || (await fetchTitleFromUrl(url)),
    tags: tagIds,
  });

  await bookmark.save();
  return bookmark;
}

async function findBookmarkOrThrow(id, userId) {
  const bookmark = await bookmarkModel
    .findOne({ _id: id, user: userId })
    .populate("tags", "_id name");

  if (!bookmark) throw new Error("Bookmark not found");
  return bookmark;
}

async function getAllBookmarks(query, userId) {
  const { q, tags } = query;
  const filter = { user: userId };

  if (typeof q === "string" && q.trim()) {
    const keyword = q.trim();
    filter.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { url: { $regex: keyword, $options: "i" } },
    ];
  }

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
    const results = await bookmarkModel
      .find(filter)
      .populate("tags", "_id name")
      .lean();

    return results;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw new Error("Failed to fetch bookmarks");
  }
}

async function updateBookmark(id, userId, updateData) {
  const bookmark = await bookmarkModel.findOneAndUpdate(
    { _id: id, user: userId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!bookmark) {
    throw new Error("Bookmark not found");
  }

  return bookmark;
}

async function deleteBookmark(id, userId) {
  const bookmark = await bookmarkModel.findOneAndDelete({
    _id: id,
    user: userId,
  });
  if (!bookmark) {
    throw new Error("Bookmark not found");
  }
  return bookmark;
}

async function makeFavourite(id, userId) {
  const bookmark = await findBookmarkOrThrow(id, userId);
  bookmark.isFavorite = !bookmark.isFavorite;
  await bookmark.save();
  return bookmark;
}

module.exports = {
  createBookmark,
  getAllBookmarks,
  updateBookmark,
  deleteBookmark,
  findBookmarkOrThrow,
  makeFavourite,
  fetchTitleFromUrl,
};
