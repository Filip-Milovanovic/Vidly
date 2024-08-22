const mongoose = require("mongoose");

// Creating Schema for database objct
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
});

// Creating Genre object
const Genre = mongoose.model("Genre", genreSchema);

// Create Genre function
const createGenre = async (name) => {
  const genre = new Genre({
    name: name,
  });

  try {
    const result = await genre.save();
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

// Get All Genres Function
const getGenres = async () => {
  try {
    return await Genre.find();
  } catch (err) {
    console.log(err.message);
  }
};

// Get One Genre By ID
const getGenre = async (id) => {
  try {
    const genre = await Genre.findById(id);
    return genre;
  } catch (err) {
    console.log(err.message);
  }
};

exports.Genre = Genre;
exports.createGenre = createGenre;
exports.getGenre = getGenre;
exports.getGenres = getGenres;
exports.genreSchema = genreSchema;
