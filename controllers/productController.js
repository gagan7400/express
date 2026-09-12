let productModel = require("../models/productModel");

let addProduct = async (req, res) => {
    try {

        let newProduct = await productModel.insertOne(req.body);
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

let getAllProduct = async (req, res) => {
    try {
        let products = await productModel.find();
        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

let getproductbypage = async (req, res) => {
    try {
        let { page } = req.params;
        let total = await productModel.countDocuments();
        let products = await productModel.find().skip(2 * (page - 1)).limit(2);

        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: { products, page, total }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

let getProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let product = await productModel.findById(id);
        // let product = await productModel.findOne({ name: "iphone" });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product found",
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

let updateProduct = async (req, res) => {
    try {
        let { id } = req.params;//in this code use name in the place of id when you call the api from the testing tool

        let product = await productModel.findOne({ "name": id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        let newProduct = await productModel.updateMany({ "name": id }, { $set: req.body });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: newProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

let deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let product = await productModel.findOne({ "price": id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let deleteProduct = await productModel.deleteMany({ "price": { "$gt": 1 } })
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getproductbypage
};
