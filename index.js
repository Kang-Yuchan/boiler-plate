const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://kangyuchan:${DB_PASSWORD}@cluster0.g9bv5.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB connected.."))
  .catch(error => console.log(error));

app.get("/", (req, res) => res.send("Hello express"));

app.listen(PORT, () =>
  PORT
    ? console.log(`Listening on localhost:${PORT} ⚡`)
    : console.log(`Server is Dead..💀`)
);
