let router = require("express").Router();
let { newblog, allblogs, deleteblog } = require("../controllers/blogController.js");
const upload = require("../middlewares/upload.js");



router.post("/newblog", upload.single("blogImage"), newblog);
router.get("/allblogs", allblogs)
router.delete("/deleteblog/:id", deleteblog)

module.exports = router;