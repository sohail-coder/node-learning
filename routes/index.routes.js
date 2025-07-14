const express = require("express");
const router = express.Router();
const { getHome } = require("../controllers/index.controller.js");

router.get("/", getHome);

module.exports = router;
