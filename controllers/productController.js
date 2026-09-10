let productModel = require("../models/productModel");
const { MAILSEND } = require("../utils/SendEmail");
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
        await MAILSEND(process.env.GMAIL,"Product Update","new product added" ,"<h1> new product added</h1>")
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
        // let products = await productModel.find().sort({ price: 1 });
        // $eq operator 
        // let products = await productModel.find().distinct("description");
        // let products = await productModel.find({quantity:{"$eq":200}}); equal operator
        // let products = await productModel.find({quantity:{"$ne":200}}); // not equal operator
        // let products = await productModel.find({quantity:{"$gt":200}}); // greator operator
        // let products = await productModel.find({quantity:{"$gte":200}}); // greator than equal operator
        // let products = await productModel.find({quantity:{"$lt":200}}); // less operator
        // let products = await productModel.find({quantity:{"$lte":200}}); // less than equal operator
//         let products = await productModel.find({price:{"$in":[10000,20000]}}); // in operator
// //  (values present in the array are find by the query )
        // let products = await productModel.find({price:{"$nin":[10000,20000]}}); // in operator
        //  (values which is not  present in the array are find by the query )
        // logical operators 
        //   $And operator is simliar to && operator in js ,its working is same, when all the queries are setisfied then only it get the output 
        // db.products.find({ $and: [ { price: { $gt: 50 } }, { inStock: true } ] });

        // let products = await productModel.find({ 
        //     "$and":[{price:{"$gt":10000}} , { quantity:200}]
        //  });   //$and operator
        
        // let products = await productModel.find({ 
        //     "$or":[{price:{"$gt":10000}} , { quantity:200}]
        //  });   //$or operator,it get the data when any of the query is setisfied.
        
        // let products = await productModel.find({price:{"$not":{"$gt":10000}}});   
        // logical not operator ,it do the oposite thing which is given in the query
        
        // $nor : // $nor — none of the conditions may be true
        // let products = await productModel.find({
        //     "$nor":[ {price:{"$gt":10000}} , { quantity: 200 }]
        // });   
        // both the queries are unsatified then it give the output
        
        //Element & Array Operators
// $exists — field must (or must not) be present
        //  let products = await productModel.find({stock:{"$exists":false}}); // it get the document which does not have or (not have) the given feild  
         
        // $type — field must be a specific BSON type
        // let products = await productModel.find({price:{"$type":"number"}});//it get the document when the type is same a given in the query ;
        

        // $all — array field must contain ALL listed values
        // let products = await productModel.find({ tags: { $all: ["mongodb", "database"] } });

        //  $elemMatch — at least one array element matches ALL conditions
            // db.students.find({
            //         scores: { $elemMatch: { subject: "Math", score: { $gte: 80 } } }
            //      });

// $elemMatch is critical when querying arrays of embedded documents: without it, MongoDB would match a document if any array  element satisfies the subject condition and any (possibly different) element satisfies the score condition — $elemMatch forces a single element to satisfy both.


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
  
// book management system
// user, books ,admin,
// user: - registration, login, deleteaccount, updateprofile, getprofile
// book: - addbook, deletebook, getbook, getbooks, updatebook
// admin: - login