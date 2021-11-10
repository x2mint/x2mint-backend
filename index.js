const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

//Config CORS
const cors = require("cors");
app.options("*", cors());

//Config env
dotenv.config({ path: "./config.env" });
//Connect DB
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(" Mongoose connect ");
      });
  } catch (error) {
    console.log("Connect Error :", error.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => res.send("Hello world"));
const PORT = 5000;

app.listen(PORT, () => console.log("Server started on port ", PORT));
