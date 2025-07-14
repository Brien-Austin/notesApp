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

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 15000,
    });

    const title = await page.title();
    console.log(`Found title: ${title}`);

    return title || "Untitled";
  } catch (error) {
    console.error(`Error fetching title from ${url}:`, error.message);
    return "Untitled";
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
async function createBookmark(url, title = "", tags = []) {
  const bookmark = new bookmarkModel({
    url,
    title: title || (await fetchTitleFromUrl(url)),
    tags,
  });
  await bookmark.save();
  return bookmark;
}
async function findBookmarkOrThrow(id) {
  const bookmark = await bookmarkModel.findById(id);
  if (!bookmark) {
    throw new Error("Bookmark not found");
  }
  return bookmark;
}

async function getAllBookmarks(query) {
  const { q, tags } = query;
  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { url: { $regex: q, $options: "i" } },
    ];
  }

  if (tags) {
    const tagList = tags.split(",").map((tag) => tag.trim());
    filter.tags = { $in: tagList };
  }

  return await bookmarkModel.find(filter);
}

async function getBookmarkById(id) {
  const bookmark = await bookmarkModel.findById(id);
  if (!bookmark) {
    throw new Error("Bookmark not found");
  }
  return bookmark;
}

async function updateBookmark(id, updateData) {
  const bookmark = await bookmarkModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!bookmark) {
    throw new Error("Bookmark not found");
  }
  return bookmark;
}

async function deleteBookmark(id) {
  const bookmark = await bookmarkModel.findByIdAndDelete(id);
  if (!bookmark) {
    throw new Error("Bookmark not found");
  }
  return bookmark;
}

async function makeFavourite(id) {
  const bookmark = await findBookmarkOrThrow(id);
  bookmark.isFavorite = !bookmark.isFavorite;
  await bookmark.save();
}
module.exports = {
  createBookmark,
  getAllBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
  findBookmarkOrThrow,
};
