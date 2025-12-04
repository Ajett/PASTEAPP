
const express = require("express");
const Paste = require("../models/pasteModel");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const paste = await Paste.create({
      ...req.body,
      userId: req.user
    });
    res.json(paste);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL
router.get("/", auth, async (req, res) => {
  try {
    const data = await Paste.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid paste ID" });
    }

    const paste = await Paste.findOne({ _id: id, userId: req.user });

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.json(paste);
  } catch (err) {
    console.error("ERROR fetching paste:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Paste.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Paste.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!deleted) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
