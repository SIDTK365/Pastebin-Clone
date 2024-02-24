const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/document");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

dotenv.config();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from localhost on port  3000
  }),
);

const connectionString = process.env.connectionString;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hii");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;
  const expires = req.body.expires;
  const expiresAt = new Date(Date.now() + expires * 1000); // Convert the expires value to milliseconds and add it to the current time
  try {
    const newDocument = await Document.create({ value, expiresAt });
    console.log("This is the new doc id", newDocument._id);
    res
      .status(200)
      .json({ message: "Document saved successfully", id: newDocument._id });
  } catch (e) {
    console.log("This is the error !!!", e);
    res
      .status(500)
      .json({ message: "Error saving document", error: e.message });
  }
});

app.get("/:id", async (req, res) => {
  const docID = req.params.id;
  try {
    const docValue = await Document.findById(docID);
    res.status(200).json(docValue.value);
  } catch (e) {
    console.log("Error", e);
    res
      .status(500)
      .json({ message: "Error retrieving document", error: e.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
