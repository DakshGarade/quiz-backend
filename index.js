const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./models/Question");

const app = express();
const PORT = 5000;
 
app.use(cors());
app.use(express.json());
require('dotenv').config();

 
const mongouri= process.env.MONGO_URL;
console.log(mongouri)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB error:", err));
 
app.get("/", (req, res) => {
  res.send("🎉 Quiz API is running!");
});
 
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

 
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
}); 
app.post("/api/questions", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({ message: "Question added" });
  } catch (error) {
    res.status(400).json({ error: "Failed to add question" });
  }
});


async function seedQuestions() {
  const count = await Question.countDocuments();
  if (count === 0) {
    await Question.insertMany([
    {
        questionNo: 1,
        question: "Q1. What does HTML stand for ?",
        option1: "Hyper Text Markup Language",
        option2: "HyperLinks and Text Markup Language",
        option3: "Home Tool Markup Language",
        option4: "HyperLink Markup Language",
        ans: "Hyper Text Markup Language"
    },
    {
        questionNo: 2,
        question: "Q2. The Bootstrap grid system is based on how many columns ?",
        option1: 6,
        option2: 9,
        option3: 12,
        option4: 3,
        ans: 12
    },
    {
        questionNo: 3,
        question: "Q3. What does CSS stand for ?",
        option1: "Colorful Style Sheets",
        option2: "Cascading Style Sheets",
        option3: "Creative Style Sheets",
        option4: "Computer Style Sheets",
        ans: "Cascading Style Sheets"
    },
    {
        questionNo: 4,
        question: "Q4. Which property is used to change the background color ?",
        option1: "bgcolor",
        option2: "color",
        option3: "background-color",
        option4: "text-align",
        ans: "background-color"
    },
    {
        questionNo: 5,
        question: "Q5. Javasctipt is the same as Java ?",
        option1: "True",
        option2: "False",
        option3: "Both Of Above",
        option4: "None Of These",
        ans: "False"
    },
    {
        questionNo: 6,
        question: "Q6. Which event occurs when the user clicks on an HTML element ?",
        option1: "onchange",
        option2: "onmouseclick",
        option3: "onmouseover",
        option4: "onclick",
        ans: "onclick"
    },
    {
        questionNo: 7,
        question: "Q7. Is JavaScript case-sensitive ?",
        option1: "True",
        option2: "False",
        option3: "Both Of Above",
        option4: "None Of These",
        ans: "True"
    }
]
);
    console.log("✅ Seeded default questions");
  }
}

seedQuestions();
