const mysql2 = require("mysql2");
// const mysql= require("mysql");
const dbConnection = mysql2.createPool({
	user: "evangadiuser",
	database: "evangadidb2",
	password: "evangadiuser",
	connectionlimit: 10,
});



dbConnection.getConnection(function (err, connection) {
	console.log("Database connected");
});
// let users = `CREATE TABLE if not exists users(
//     user_id int auto_increment,
//     user_name varchar(255) not null,
//      first_name varchar(255) not null,
//     last_name varchar(255) not null,
//     user_email varchar(255) not null,
//     user_password varchar(255) not null,
//     question_id int not null,
//     PRIMARY KEY (user_id),
//     FOREIGN KEY (question_id) REFERENCES questions(question_id)
//     )`;

// let questions = `CREATE TABLE if not exists questions(
//     question_id int auto_increment,
//     question  varchar(255) not null,
//     question_description varchar(255) not null,
//     question_code_block  varchar(255),
//     tags  varchar(255),
//     post_id  varchar(255) not null,
//     user_id int not null,
//     PRIMARY KEY (question_id),
//     UNIQUE KEY (post_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// )`;
// let answers = `CREATE TABLE if not exists answers(
//     answer_id int auto_increment,
//     answer varchar(255) not null,
//     answer_code_block  varchar(255),
//    question_id int not null,
//     user_id int not null,
//     PRIMARY KEY (answer_id),
//    FOREIGN KEY (question_id) REFERENCES questions(question_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// )`;
//

// Create the 'users' table without foreign keys
// let users = `CREATE TABLE if not exists users(
//     user_id int auto_increment,
//     user_name varchar(255) not null,
//     first_name varchar(255) not null,
//     last_name varchar(255) not null,
//     user_email varchar(255) not null,
//     user_password varchar(255) not null,
//     PRIMARY KEY (user_id)
// )`;

// Create the 'questions' table without foreign keys
// let questions = `CREATE TABLE if not exists questions(
//     question_id int auto_increment,
//     question varchar(255) not null,
//     question_description varchar(255) not null,
//     question_code_block varchar(255),
//     tags varchar(255),
//     post_id varchar(255) ,
//     user_id int not null,
//     PRIMARY KEY (question_id),
//     UNIQUE KEY (post_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// )`;

// Create the 'answers' table without foreign keys
// let answers = `CREATE TABLE if not exists answers(
//     answer_id int auto_increment,
//     answer varchar(255) not null,
//     answer_code_block varchar(255),
//     question_id int not null,
//     user_id int not null,
//     PRIMARY KEY (answer_id),
//         FOREIGN KEY (question_id) REFERENCES questions(question_id),
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// )`;

// Now, add the foreign keys to the 'users' and 'questions' tables
// const addForeignKeys = `
// ALTER TABLE users
//     ADD CONSTRAINT FK_UserQuestion FOREIGN KEY (question_id) REFERENCES questions(question_id);

// ALTER TABLE questions
//     ADD CONSTRAINT FK_QuestionUser FOREIGN KEY (user_id) REFERENCES users(user_id);
// `;

// Execute the SQL statements to create tables and add foreign keys in your database.
// 
let users = `CREATE TABLE IF NOT EXISTS users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(userid)
)`;

let questions = `CREATE TABLE IF NOT EXISTS questions(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id, questionid),
    FOREIGN KEY(userid) REFERENCES users(userid))`;
let answers = `CREATE TABLE IF NOT EXISTS answers (
    answerid INT(30) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES questions(questionid),
    FOREIGN KEY(userid) REFERENCES users(userid))`;

dbConnection.query(users, (err, results) => {
	if (err) {
		console.log(err.message)
	} else {
		
		console.log("user table created");
	}
});

dbConnection.query(questions, (err, results) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log("questions table created");
		}
});
dbConnection.query(answers, (err, results) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log("answers table created");
		}
});
module.exports=dbConnection.promise()