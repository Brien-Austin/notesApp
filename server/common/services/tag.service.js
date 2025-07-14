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

module.exports = { createTags, findOrCreateTagsByName, getAllTags };
