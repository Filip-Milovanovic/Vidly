const express = require("express");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const router = express.Router();

//HTTP Requests

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.send(rentals);
  } catch (err) {
    console.status(200).log(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.send("Rental with provided ID does not exist.");

    res.status(200).send(rental);
  } catch (err) {
    console.lor(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let movie = await Movie.findById(req.body.movieId);
    let customer = await Customer.findById(req.body.customerId);
    if (!movie || !customer)
      return res
        .status(400)
        .send("Movie or Customer with provided ID does not exist.");
    let rental = new Rental({
      customer: {
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    rental = await rental.save();
    movie.numberInStock--;
    movie = await movie.save();

    res.send(rental);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { movieId, customerId } = req.body;

    const movie = await Movie.findById(movieId);
    const customer = await Customer.findById(customerId);

    if (!movie || !customer)
      return res
        .status(400)
        .send("Movie or Customer with provided ID does not exist.");

    const rental = await Rental.findById(req.params.id);
    rental.set({
      customer: {
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    const result = await rental.save();
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental)
      return res.status(400).send("Rental with provided ID does not exist.");

    res.status(200).send(rental);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
