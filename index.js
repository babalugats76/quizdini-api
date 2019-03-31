const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");

require("./models/User");       // Load before passport, etc.
require("./services/passport"); // Since nothing is being exported


mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

require('./routes/authRoutes')(app);

app.get("/match/4", (req, res) => {
  //console.log('received request...', req);
  res.json({
    title: "Basic Computer Science Vocabulary",
    topic: "Programming",
    author: "Mr. James Colestock",
    instructions: "Take a moment to review key programming terms from Unit 1",
    config: {
      itemsPerBoard: 9,
      duration: 50
    },
    matches: ""
  });
});

app.post("/match", (req, res) => {
  console.log("Requesting to create a new record!");
  console.log(req.body);
  res.json(req.body);
});

const PORT = process.env.port || 5000;
app.listen(PORT);
