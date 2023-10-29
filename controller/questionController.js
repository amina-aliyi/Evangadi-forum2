
const uuid= require('uuid')
const dbConnection = require("../db/dbConfig");


async function question(req, res) {
	const { title, description, tag } = req.body;
	if (!title|| !description) {
		return res
		.status(400)
		.json({ msg: "Please provide your question." });
	}
	const questionid = uuid.v4();
	const userid = req.user.userid;

	try {
		await dbConnection.query(
			"INSERT INTO questions ( questionid,title, description, tag, userid) VALUES (?,?,?,?,?)",
			[questionid, title, description, tag, userid]
		);
		return res.status(201).json({ msg: "Question inserted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Something went wrong" });
	}
}




	async function allQuestions(req, res) {
		try {
			// Perform a SELECT query to fetch questions from the database
			const questions = await dbConnection.query("SELECT q.questionid, q.description, q.title, u.username FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC;" );
         
			// Send the retrieved questions as a JSON response
			res.status(200).json(questions);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ msg: "Something went wrong while fetching questions" });
		}
	}



	async function singleQuestion(req, res) {
		const questionId = req.params.questionid;
        console.log(questionId)
		try {
			// Perform a SELECT query to fetch a single question by its ID
			const query = "SELECT * FROM questions WHERE questionid = ?";
			const [question] = await dbConnection.query(query, [questionId]);

			if (question.length === 0) {
				return res.status(404).json({ msg: "Question not found" });
			}

			// Send the retrieved question as a JSON response
			res.status(200).json(question[0]);
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ msg: "Something went wrong while fetching the question" });
		}
	}

module.exports = { question, allQuestions, singleQuestion };
