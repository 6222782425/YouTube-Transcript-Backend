const user = require("../controllers/user.controller.js");
var router = require("express").Router();
const auth = require("../middleware/auth");

// Create a new Tutorial
router.post("/register", user.create);
router.post("/login", user.login);
// Retrieve all Tutorials
// router.get("/", auth, (req, res) => {
//   // executes after authenticateToken
//   // ...
//   res.status(200).send("Welcome 🙌 ");
// });
router.get("/me", auth, user.findMe);
router.get("/", auth, user.findAll);
// Retrieve all published Tutorials
// router.get("/published", user.findAllPublished);
// Retrieve a single Tutorial with id
router.get("/:id", auth, user.findOne);
// Update a Tutorial with id
// router.put("/:id", user.update);
// Delete a Tutorial with id
router.delete("/:id", auth, user.delete);
// Create a new Tutorial
router.delete("/", auth, user.deleteAll);
module.exports = router;
