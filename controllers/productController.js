let productModel = require("../models/productModel");
let addProduct = async (req, res) => {
    try {
        // let { name, price, category, description, quantity } = req.body;

        // if (!name || !price || !category || !description || !quantity) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please provide all the details"
        //     });
        // }


        // to insert the data ,we have create query , insertOne, insertMany query.
        console.log(req.body);
        let newProduct = await productModel.insertMany([...req.body]);
        // let newProduct = await productModel.insertOne({ name, price, category, description, quantity });

        // let newProduct = await productModel.create({
        //     name,
        //     price,
        //     category,
        //     description,
        //     quantity,
        // });
        // await newProduct.save();
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
        // let products = await productModel.find();
        let products = await productModel.find().sort({ price: 1 });

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



// let updateProduct = async (req, res) => {
//     try {
//         let { id } = req.params;

//         let updatedProduct = await productModel.findByIdAndUpdate(
//             id,
//             req.body,
//             { new: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Product updated successfully",
//             data: updatedProduct
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
// let updateProduct = async (req, res) => {
//     try {
//         let { id } = req.params;

//         let product = await productModel.findOne({ "_id": id });

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }


//         let newProduct = await productModel.updateOne({ "_id": id }, { $set: req.body });

//         res.status(200).json({
//             success: true,
//             message: "Product updated successfully",
//             data: newProduct
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
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


// let deleteProduct = async (req, res) => {
//     try {
//         let { id } = req.params;

//         let deletedProduct = await productModel.findByIdAndDelete(id);

//         if (!deletedProduct) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Product deleted successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// let deleteProduct = async (req, res) => {
//     try {
//         let { id } = req.params;

//         let product = await productModel.findOne({ "_id": id });

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         let deleteProduct = await productModel.deleteOne({ "_id": id })
//         res.status(200).json({
//             success: true,
//             message: "Product deleted successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

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

        let deleteProduct = await productModel.deleteMany({ "price": id })
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

// CRUD:
// Create - insertOne, insertMany, create
// Read - find, findOne, findById
// Update - updateOne, updateMany, findByIdAndUpdate
// Delete - deleteOne, deleteMany, findByIdAndDelete;

// backend setup :- database connection ,
// models , routes ,controllers,

// javascript backend :-  express+ nodejs ,
//   :- nodejs + nestjs


// python backend:-  python + django
// Java backend:-  java + springboot + jsp servlet
// dotnet backend - c# + dotnet
// php :- php + laravel +ci


// book management system
// user, books ,admin,
// user: - registration, login, deleteaccount, updateprofile, getprofile
// book: - addbook, deletebook, getbook, getbooks, updatebook
// admin: - login