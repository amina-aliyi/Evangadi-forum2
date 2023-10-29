// dbConnection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");

const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')


async function register(req, res) {
	const { username, firstname, lastname, email, password } =
		req.body;
	if (
		!username ||
		!firstname ||
		!lastname ||
		!email ||
		!password
	) {
		return res.status(400).json({ msg: "please provide all the information" });
	}
	try {
		const [user]= await dbConnection.query ("SELECT username,userid from users where username = ? or email =?",
			[username, email])
		// return res.json({ user: user })
		if (user.length > 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already exists"})
		}
		if (password.length < 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "password must be atleast 8 characters" });
		}
		

		// encrypt password

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt)
		await dbConnection.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
			[username, firstname, lastname, email, hashedPassword]
		);
		return res.status(StatusCodes.CREATED).json({msg: "user created"})
	} catch (error) {
		console.log(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong"})
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all fields"})
	}
	try {
const [user]= await dbConnection.query("select username,userid,password from users where email = ?", [email])
		//   return res.json({user:user})
		if (user.length == 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({msg:"ivalid"})
		}

		// compare password
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential"})
		}
		const username = user[0].username;
		const userid = user[0].userid;
	const token=jwt.sign({username, userid}, "secret", {expiresIn: "1d"})
return res.status(StatusCodes.OK).json({msg:"user login successful", token, username})
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong" });
	}
}

async function checkUser(req, res) {
	const username = req.user.username
	const userid= req.user.userid
	return res.status(StatusCodes.OK).json({msg: "valid user", username, userid})
	// res.send("check");
}

module.exports = { register, login, checkUser };
