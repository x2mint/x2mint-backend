const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const authRoute = require("./src/routers/authRoutes");
const questionRoute = require("./src/routers/questionRoutes");
const answerRoute = require("./src/routers/answerRoutes");
const userRoute = require("./src/routers/userRoutes");
const testRoute= require("./src/routers/testRoutes");
const contestRoute = require("./src/routers/contestRoutes");

//Config env
dotenv.config({ path: "./config.env" });

//Config CORS
const cors = require("cors");
app.options("*", cors());
app.use(express.json());

//Base url: no slash at the end
//const api = process.env.API_URL;
const api = '/app/api/v1';
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

/* ---------------------------------- Route --------------------------------- */
app.use(`${api}/auths`, authRoute);
app.use(`${api}/questions`, questionRoute);
app.use(`${api}/answers`, answerRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/tests`, testRoute);
app.use(`${api}/contests`, contestRoute);

app.get("/", (req, res) => res.send("Hello world"));
const PORT = 5000;

app.listen(PORT, () => console.log("Server started on port ", PORT));
