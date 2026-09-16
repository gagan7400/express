let mongoose = require("mongoose");

let blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    blogImage: { url: String, name: String }
}, { timeStamp: true });
let blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;