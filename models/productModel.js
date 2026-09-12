let mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        discountPercentage: {
            type: Number,
            min: 0,
            max: 100
        },

        rating: {
            type: Number,
            min: 0,
            max: 5
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        },

        tags: [String],

        brand: String,
        weight: Number,

        dimensions: {
            width: Number,
            height: Number,
            depth: Number
        },

        minimumOrderQuantity: {
            type: Number,
            min: 1
        },
        images: [String],
        thumbnail: String
    },
    { timestamps: true }
);

let productModel = mongoose.model("Product", productSchema);
module.exports = productModel;



