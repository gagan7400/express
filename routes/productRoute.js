let router = require("express").Router();

let productMidd = require("../middlewares/productMiddleware")
// router level middleware
router.use(productMidd);//it only call when the request is related to products routes


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

router.get("/getallproduct", (req, res) => {
    res.send("getallproduct done")
})

module.exports = router;