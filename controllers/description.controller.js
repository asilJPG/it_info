const { errorHandler } = require("../helpers/error_handler");
const Description = require("../models/Description");
const { model } = require("mongoose");

const createId = async (req, res) => {
  try {
    const { description, category_id } = req.body;
    const newDescription = await Description({
      description,
      category_id,
    });
    // const desc = await Description.findOne({
    //   description: { $regex: description, $optional: "i" },
    // });
    // if (desc) {
    //   return res
    //     .status(400)
    //     .send({ message: "This description already exist" });
    // }
    await newDescription.save();
    res.status(200).send({ message: "Description successfully created" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const desc = await Description.find({});
    if (!debuggeresc) {
      return res.status(500).send({ message: "Descriptions not found" });
    }
    res.json({ desc });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getbyId = async (res, req) => {
  try {
    const desc = await Description.findOne({ _id: req.params.id });
    if (!desc) {
      return res.status(500).send({ message: "Description not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  createId,
  getAll,
  getbyId,
};
