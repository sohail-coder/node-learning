const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  test,
} = require("../controllers/auth.controller");

const auth = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", auth("admin", "student"), test);
module.exports = router;
