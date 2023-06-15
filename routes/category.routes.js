const Router = require("express");
const {
  add,
  getAll,
  getByid,
  createCategory,
  updateId,
  deleteId,
} = require("../controllers/category.constorllers");
const router = Router();

router.post("/add", createCategory);
router.get("/", getAll);
router.get("/:id", getByid);
router.put("/:id", updateId);
router.delete("/:id", deleteId);

module.exports = router;
