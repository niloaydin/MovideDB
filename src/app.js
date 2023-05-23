const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const managerRoutes = require("./routes/manager");
const directorRoutes = require("./routes/director");
const audienceRoutes = require("./routes/audience");

const app = express();
const PORT = process.env.PORT || 3001;

//global.db = connection;
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRoutes);
app.use("/manager", managerRoutes);
app.use("/director", directorRoutes);
app.use("/audience", audienceRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
