const mongoose = require("mongoose");

// Creating Schema for database objct
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 5, maxlength: 20 },
});

// Creating Genre object
const Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;
