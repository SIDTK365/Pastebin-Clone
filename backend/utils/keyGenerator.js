// utils/keyGenerator.js
const { customAlphabet } = require("nanoid");
const Document = require("./models/document"); // Make sure to require your Document model

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const nanoId = customAlphabet(ALPHABET, 8);

const generateUniqueId = async () => {
  let uniqueId = nanoId();

  // Check if the generated ID already exists in the database
  const existingDocument = await Document.findById(uniqueId);

  // If the ID exists, generate a new one
  while (existingDocument) {
    uniqueId = nanoId();
    existingDocument = await Document.findById(uniqueId);
  }

  return uniqueId;
};

module.exports = { generateUniqueId };
