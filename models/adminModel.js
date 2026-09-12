let mongoose = require("mongoose");
let validator = require("validator");
let adminSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 2,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        validate: [validator.isEmail, "pls provide valid email"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, "password must be strong"]
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });
let adminModel = mongoose.model("admins", adminSchema);

module.exports = adminModel;