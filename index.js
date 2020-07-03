const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const config = require("./config/key");
dotenv.config();

const PORT = process.env.PORT;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected.."))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser());

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

app.post("/login", (req, res) => {
  // find requested email in DB
  User.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      if (!user) {
        // if not exist user
        return res.json({
          loginSuccess: false,
          message: "This user is not exist."
        });
      }
      // confirm password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "This password is not currect."
          });
        }
        user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id
          });
        });
      });
    }
  );
});

app.listen(PORT, () =>
  PORT
    ? console.log(`Listening on localhost:${PORT} ⚡`)
    : console.log(`Server is Dead..💀`)
);
