const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre, getGenre, getGenres, createGenre } = require("../models/genre");

// HTTP Requests ////

// Get all
router.get("/", async (req, res) => {
  try {
    const genres = await getGenres();
    res.status(200).send(genres);
  } catch (err) {
    console.log(err.message);
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const genre = await getGenre(id);
    if (!genre) {
      return res.status(404).send("Genre with provided ID does not exist.");
    }
    res.status(200).send(genre);
  } catch (err) {
    console.log(err.message);
  }
});

// Insert one
router.post("/", auth, async (req, res) => {
  try {
    const result = await createGenre(req.body.name);
    if (!result) res.status(400).send("Something went wrong...");
    else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.log(err.message);
  }
});

// Update one
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const genre = await getGenre(id);
    if (!genre)
      return res.status(404).send("Genre with provided ID does not exist.");

    genre.set({
      name: req.body.name,
    });
    const result = await genre.save();

    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

// Delete one
router.delete("/:id",[auth, admin], async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Genre.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("The genre with the given ID was not found");
      return;
    }

    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
