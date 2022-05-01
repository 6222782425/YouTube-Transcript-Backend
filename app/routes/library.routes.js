const library = require("../controllers/library.controller.js");
var router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, library.create);
router.get("/", auth, library.findOne);

module.exports = router;
