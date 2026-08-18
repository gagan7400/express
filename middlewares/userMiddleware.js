let userMidd = (req, res, next) => {
    if (req.headers.token == "xyz") {
        console.log("token is verified")
        next();
    } else {
        console.log("token is not verified")
        res.send("error user not found")
    }
}

module.exports = userMidd