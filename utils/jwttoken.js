let jwt = require("jsonwebtoken")
let createtoken = async (details) => {
    let token = await jwt.sign(details, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

let decodedtoken = () => {

}

module.exports = { createtoken, decodedtoken }
// npm i jsobwebtoken