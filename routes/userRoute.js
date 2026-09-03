let express = require("express");
let router = express.Router();
let userMidd = require("../middlewares/userMiddleware")

const { register, login, logout, getalluser } = require("../controllers/userController");
router.use(userMidd)

router.post("/register", register);
router.post("/getalluser", getalluser);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;





// router.put("/resetpassword", (req, res) => {
//     res.send("logout done")
// })
// router.get("/getprofile", (req, res) => {
//     res.send("logout done")
// })
// router.get("/forgotpassword", (req, res) => {
//     res.send("logout done")
// })
// router.get("/resendotp", (req, res) => {
//     res.send("logout done")
// })
// router.post("/verifyotp", (req, res) => {
//     res.send("logout done")
// })
// router.delete("/deactviateaccount", (req, res) => {
//     res.send("logout done")
// })
// router.delete("/deleteaccount", (req, res) => {
//     res.send("logout done")
// })