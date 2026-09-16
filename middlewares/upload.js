//to upload all type of files ,image,video,pdf,audio,and all.
let multer = require("multer");
let path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../uploads"))
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage })
module.exports = upload;