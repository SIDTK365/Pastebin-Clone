const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: "1s", // This is a placeholder value. The actual expiration time is determined by the 'expiresAt' field's value.
  },
});

module.exports = mongoose.model("document", documentSchema);
