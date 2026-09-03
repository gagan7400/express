let db = require("../db/connectDB")

let register = async (req, res) => {

    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(404).json({ success: false, message: "pls provide all the details" })
    }

    res.status(200).json({ success: true, message: "registration done" })
}

// to get some data :- collection.find().toArray();
// to get some data :- collection.findOne({name:"raj"});
// to add some data :- collection.insertOne({});
// to add some data :- collection.insertMany([{},{}]);
//to update some data :- collection.updateOne({name:"raj"},{"$set":{}})
//to update some data :- collection.updateMany({name:"raj"},{"$set":{}});
//to delete some data :- collection.deleteOne({name:"raj"});
//to delete some data :- collection.deleteMany({name:"raj"});

let login = (req, res) => {
    res.send("login done")
}

let logout = (req, res) => {
    res.send("logout done")
}
let getalluser = async (req, res) => {



}

module.exports = { register, login, logout, getalluser }