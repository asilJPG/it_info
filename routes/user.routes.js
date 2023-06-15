const Router = require("express");
const {
  getAll,
  add,
  loginUser,
  getByid,
} = require("../controllers/user.controller");
const router = Router();

router.get("/", getAll);
router.post("/add", add);
router.post("/login", loginUser);
router.get("/:id", getByid);
module.exports = router;
