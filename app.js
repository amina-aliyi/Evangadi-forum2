require("dotenv").config();
const express = require("express");
const app = express();
port = 6002;

// dbConnection
const dbConnection = require("./db/dbConfig");

const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// user routes middleware
const userRoutes = require("./routes/userRoute");

// json middleware to extract json data, anymethod/request
app.use(express.json());

app.use("/api/users", userRoutes);

// questions middleware

const questionRoutes = require("./routes/questionRoute");
const authMiddleware = require("./middleWare/authMiddleware");

app.use("/api/questions", authMiddleware, questionRoutes);

// answer routes middleware
const answerRoutes = require("./routes/answerRoute");

app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
	try {
		const result = await dbConnection.execute("select'test'");
		// console.log(result)
		await app.listen(port);
		console.log(`listening on ${port}`);
	} catch (error) {
		console.log(error.message);
	}
}
start();

// app.listen(port, (err) => {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(`listening on ${port}`);
// 	}
// });
