const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("Hello express"));

app.listen(PORT, () =>
  PORT
    ? console.log(`Listening on localhost:${PORT} ⚡`)
    : console.log(`Server is Dead..💀`)
);
