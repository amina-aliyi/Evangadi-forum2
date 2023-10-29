const express = require("express");

const {postAnswer, answers }= require('../controller/answerController');

const router = express.Router();



// setting route to post answers to each questions

router.post("/question/:questionid", postAnswer);

// router.post("/answer", postAnswer);


//  setting route to get all answers for each question
router.get("/all-answers/:questionid", answers)

module.exports =  router 
