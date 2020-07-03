const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
dotenv.config();

const PORT = process.env.PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;

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

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.get("/", (req, res) => res.send("Hello express"));

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true
    });
  });
});

app.listen(PORT, () =>
  PORT
    ? console.log(`Listening on localhost:${PORT} ⚡`)
    : console.log(`Server is Dead..💀`)
);
