const express = require("express");
const connectdb = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

connectdb();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server is runnig......" });
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port....${process.env.PORT}`);
});
