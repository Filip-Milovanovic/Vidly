const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const { route } = require("./genres");

//HTTP Requests
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send("Movie with provided ID does not exist.");

    res.send(movie);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    let movie = new Movie({
      title: req.body.title,
      genre: {
        name: genre.name,
        _id: genre._id,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    movie = await movie.save();
    console.log(movie);
    res.send(movie);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      { new: true }
    );

    if (!movie)
      return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
      return res.status(400).send("Movie with provided id does not exist.");

    res.send(movie);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
