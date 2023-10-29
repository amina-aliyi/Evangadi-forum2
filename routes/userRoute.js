const express = require("express");
const { register, login, checkUser } = require("../controller/userController");
const authMiddleware = require("../middleWare/authMiddleware");
const router = express.Router()



// registration rout

router.post("/register",register)

// login user

router.post("/login", login);

// check user
router.get("/check",authMiddleware, checkUser);

module.exports = router;