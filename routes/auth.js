const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, hashPassword } = require("../models/user");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    //Generating jwt
    const token = user.generateAuthToken();

    res.send(token);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
