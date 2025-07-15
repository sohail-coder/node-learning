const express = require("express");
const app = express();
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const basicRoutes = require("./routes/basic.routes");

app.use(express.json());

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/basic", basicRoutes);
module.exports = app;
