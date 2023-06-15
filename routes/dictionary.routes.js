const { Router } = require("express");
const { getAll, add } = require("../controllers/dictionary.controller");
const router = Router();

router.post("/add", add);
router.get("/", getAll);

module.exports = router;
