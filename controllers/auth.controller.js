const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const saltRounds = 10;

const registerUser = async (req, res) => {
  const body = req.body;

  if (!body || !body.name || !body.email || !body.password) {
    return res.status(400).send("Property fields are mandatory");
  }

  try {
    const hash = await bcrypt.hash(body.password, saltRounds);

    const userData = {
      name: body.name,
      email: body.email,
      password: hash,
    };

    if (body.role) {
      userData.role = body.role;
    }

    const user = new User(userData);
    await user.save();

    console.log("User saved successfully");
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.email || !body.password) {
      return res.status(400).send("Property fields are mandatory");
    }
    const user = await User.findOne({ email: body.email });
    if (!user) return res.status(404).send("User not found");
    bcrypt.compare(body.password, user.password, (err, result) => {
      if (!result) return res.status(400).send("invalid credentials");
      const userPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(userPayload, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error", err: err });
  }
};

const test = async (req, res) => {
  try {
    return res.status(200).json({ msg: req.user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, test };
