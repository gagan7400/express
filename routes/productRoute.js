let router = require("express").Router()

router.post("/addproduct", (req, res) => {
    res.send("add product done")
})
router.put("/updateproduct", (req, res) => {
    res.send("update done")
})
// parameter routing
// http://localhost:8000/api/products/getproduct/phone/999
router.get("/getproduct/:name/:price", (req, res) => {
    let { name, price } = req.params;
    console.log(name, price)
    res.send("getproduct done")
})
// /getproduct/iphone
// /getproduct/bag
// /getproduct/bottle
// /getproduct/pen

router.get("/getAllproduct", (req, res) => {
    res.send("getallproduct done")
})

module.exports = router;