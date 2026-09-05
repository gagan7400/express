let db = require("../db/connectDB")
let userModel = require("../models/userModel")
let register = async (req, res) => {

    let { name, email, password, state, mobilenumber } = req.body;
    if (!name || !email || !password || !state || !mobilenumber) {
        return res.status(404).json({ success: false, message: "pls provide all the details" })
    }

    let olduser = await userModel.findOne({ email });
    if (olduser) {
        return res.status(404).json({ success: false, message: "email already exist" })
    }
    let newuser = await userModel.insertOne({ name, email, password, state, mobilenumber })

    // let newuser = await userModel.create({ name, email, password })
    // await newuser.save();

    res.status(200).json({ success: true, message: "registration done", data: newuser })
}


let login = (req, res) => {
    res.send("login done")
}

let logout = (req, res) => {
    res.send("logout done")
}
let getalluser = async (req, res) => {



}

module.exports = { register, login, logout, getalluser }


// basic server
// how to create an api
// middleware
// rotuing (app.method, app.use,app.all, router.method(in rotues file))
// req , res , next
// serving static files
// how to install nd setup mongodb
// how to conect mongobdriver with nodejs
// how to connect with mongoose driver