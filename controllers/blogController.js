let blogModel = require("../models/blogModel")
let fs = require("fs");
let path = require("path")

let newblog = async (req, res) => {
    try {
        let blogImage = { url: "", name: "" };;
        if (req.file) {
            blogImage = { url: process.env.BACKENDURL + req.file.filename, name: req.file.filename }
        }
        let newBlog = await blogModel.insertOne({ ...req.body, blogImage });
        res.status(200).json({ success: true, message: "add blog done", data: newBlog })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

let getblog = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await blogModel.findById(id);
        res.status(200).json({ success: true, message: "done", data: blog })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let allblogs = async (req, res) => {
    try {
        let blogs = await blogModel.find();
        res.status(200).json({ success: true, message: "done", data: blogs })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let deleteblog = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(400).json({ sucess: false, message: "blog already deleted or not found" })
        }
        if (blog.blogImage.name) {
            fs.unlinkSync(path.resolve(__dirname, "../uploads/" + blog.blogImage.name))
        }
        await blogModel.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "delete blog done", })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let updateblog = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(400).json({ sucess: false, message: "blog already deleted or not found" })
        };

        let newblog = await blogModel.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({ success: true, message: "update blog done", newblog })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { newblog, allblogs, deleteblog, updateblog, getblog }