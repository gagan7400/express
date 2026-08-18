let register = (req, res) => {
    res.send("registration done")
}
let login = (req, res) => {
    res.send("login done")
}
let logout = (req, res) => {
    res.send("logout done")
}
module.exports = { register, login, logout }