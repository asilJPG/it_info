const Router = require("express");
const {
  createAuthor,
  getAll,
  getByid,
  loginAuthor,
  deleteId,
  updateId,
} = require("../controllers/author.controller");
const router = Router();
router.post("/add", createAuthor);
router.get("/", getAll);
router.get("/:id", getByid);
router.put("/:id", updateId);
router.post("/login", loginAuthor);
router.delete("/:id", deleteId);

// router.get("/:id", getByid);

module.exports = router;
