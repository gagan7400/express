let router = require("express").Router();

let {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct ,
    getproductbypage
} = require("../controllers/productController");


router.post("/addproduct", addProduct);

router.get("/getallproduct", getAllProduct);
router.get("/pagination/:page", getproductbypage);

router.get("/getproduct/:id", getProduct);

router.put("/updateproduct/:id", updateProduct);

router.delete("/deleteproduct/:id", deleteProduct);


module.exports = router;