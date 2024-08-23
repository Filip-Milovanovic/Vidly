const _ = require("lodash");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { User, hashPassword } = require("../models/user");

const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with provided email already exists.");

    user = new User(_.pick(req.body, ["name", "email", "password"]));

    user.password = await hashPassword(user.password);

    await user.save();

    //Generate JWT
    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
