let express = require("express");
let router = express.Router();
let userMidd = require("../middlewares/userMiddleware")

const { register, login, logout, getalluser } = require("../controllers/userController");


router.post("/register", register);
router.post("/getalluser", getalluser);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;