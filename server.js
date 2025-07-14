const express = require("express");
const app = express();
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
module.exports = app;
