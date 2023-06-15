const express = require("express");
const router = express.Router();

const dictonaryRouter = require("./dictionary.routes");
const categoryRouter = require("./category.routes");
const authorRouter = require("./author.routes");
const userRouter = require("./user.routes");
const descriptionRouter = require("./description.routes");

router.use("/category", categoryRouter);
router.use("/dictionary", dictonaryRouter);
router.use("/author", authorRouter);
router.use("/user", userRouter);
router.use("/description", descriptionRouter);

module.exports = router;
