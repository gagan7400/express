let bcrypt = require("bcrypt");
let userModel = require("../models/userModel")
let register = async (req, res) => {
    try {
        let { name, email, password, state, mobilenumber } = req.body;
        if (!name || !email || !password || !state || !mobilenumber) {
            return res.status(404).json({ success: false, message: "pls provide all the details" })
        }

        let olduser = await userModel.findOne({ email });
        if (olduser) {
            return res.status(404).json({ success: false, message: "email already exist" })
        }
        let hashpassword = await bcrypt.hash(password, 10);
        //$2b$10$I5iyKNh.dy3Jfq.0.uBdVOo1dhZ7XEoXkOdK.2Oumkbc6a663xB4u
        //Ga@8gggh
        let newuser = await userModel.insertOne({ name, email, password: hashpassword, state, mobilenumber });

        // let newuser = await userModel.create({ name, email, password });
        // await newuser.save();

        res.status(200).json({ success: true, message: "registration done", data: newuser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// 1111 = jvfk == compare

let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ success: false, message: "pls provide all the details" })
        }
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "pls provide valid credentials" })
        }

        res.status(200).json({ sucess: true, message: "login successfull" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
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