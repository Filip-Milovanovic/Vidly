const express = require("express");
const { Customer } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (!customer)
    return res.status(404).send("Customer with provided ID does not exist.");
  res.status(200).send(customer);
});

router.post("/", async (req, res) => {
  try {
    const customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    });

    const result = await customer.save();
    if (!result) return res.status(400).send("Something went wrong...");

    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer)
      return res.status(404).send("Customer with provided ID does not exist.");
    customer.set({
      name: req.body.name || customer.name,
      isGold: req.body.isGold || customer.isGold,
      phone: req.body.phone || customer.phone,
    });

    const result = customer.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customer.findByIdAndDelete(id);

    if (!result)
      return res.status(404).send("Customer with provided ID does not exist.");

    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
