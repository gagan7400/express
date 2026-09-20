let router = require("express").Router();
let { newblog, allblogs, deleteblog, updateblog, getblog } = require("../controllers/blogController.js");
const upload = require("../middlewares/upload.js");



router.post("/newblog", upload.single("blogImage"), newblog);
router.get("/getblog/:id", getblog)
router.get("/allblogs", allblogs)
router.delete("/deleteblog/:id", deleteblog);
router.put("/updateblog/:id", updateblog);

module.exports = router;