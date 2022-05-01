const transcript = require("../controllers/transcript.controller.js");
var router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, transcript.create);
router.post("/find", auth, transcript.findOne);
router.delete("/:id", auth, transcript.delete);

module.exports = router;
