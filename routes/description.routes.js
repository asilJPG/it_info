const express = require("express");
const {
  getAll,
  createId,
  getbyId,
} = require("../controllers/description.controller");
const router = express.Router();

router.get("/", getAll);
router.post("/add", createId);
router.get("/:id", getbyId);

module.exports = router;
