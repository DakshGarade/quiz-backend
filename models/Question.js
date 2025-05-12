const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionNo: Number,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  ans: String,
});

module.exports = mongoose.model("Question", questionSchema);
