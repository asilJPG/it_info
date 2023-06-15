const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/Category");
const { categoryValidation } = require("../validations/category");

const Joi = require("joi");

const createCategory = async (req, res) => {
  try {
    // console.log(req.body.category_name);

    const { error, value } = categoryValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send({ message: error.details[0].message });
    }
    const { category_name, parent_category_id } = value;
    const category = await Category.findOne({
      category_name: { $regex: category_name, $options: "i" },
    });
    if (category) {
      return res.status(400).send({ message: "Bunday category bazada mavjud" });
    }
    const newCategory = await Category({
      category_name,
      parent_category_id,
    });

    // await newCategory.validate();
    await newCategory.save();
    res.status(200).send({ message: "Yangi category qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAll = async (req, res) => {
  try {
    const category = await Category.find({});
    if (!Category) {
      res.status(400).send({ messege: "Collections not found" });
    }
    res.json({ category });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getByid = async (res, req) => {
  try {
    const category = Category.find({ _id: req.params.id });
    if (!Category) {
      res.status(400).send({ messege: `Category not found` });
    }
    res.json({ category });
  } catch (error) {
    errorHandler(res, error);
  }
};
// UPDATE BY ID
const updateId = async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;

    // if (!mongoose.isValidObjectId(req.params.id)) {
    //   return res.status(400).send({ message: "Noto'g'ri ID" });
    // }

    const updateResult = await Category.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          category_name: category_name,
          parent_category_id: parent_category_id,
        },
      }
    );

    res.json(updateResult);
  } catch (error) {
    errorHandler(res, error);
  }
};

// DELETE BY ID
const deleteId = async (req, res) => {
  try {
    const deleteResult = await Category.deleteOne({
      _id: req.params.id,
    });

    res.json(deleteResult);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  getAll,
  getByid,
  createCategory,
  deleteId,
  updateId,
};
