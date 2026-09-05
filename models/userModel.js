let mongoose = require("mongoose");
let validator = require("validator");
let userSchema = new mongoose.Schema({
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
    mobilenumber: {
        type: String,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, "en-IN")
            },
            message: "pls provide valid phone number"
        }
    },
    state: {
        type: String,
        enum: ["mp", "up", "uk", "delhi", "rajasthan"],
    }
}, { timestamps: true });
let userModel = mongoose.model("users", userSchema);
// model("collectionname","schemaobject")

module.exports = userModel;