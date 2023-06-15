const { errorHandler } = require("../helpers/error_handler");
const Dictionary = require("../models/Dictionary");

const add = async (req, res) => {
  try {
    const { term, letter } = req.body;
    const newDictionary = await Dictionary({
      term,
      letter,
    });
    await newDictionary.save();
    res.status(200).send({ messege: "Yangi dictionary koshildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAll = async (req, res) => {
  try {
    const dictionary = await Dictionary.find({});
    if (!Dictionary) {
      return res.status(400).send({ messege: "Bolim not found" });
    }
    res.json({ dictionary });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getByid = async (res, req) => {
  const id = req.params.id;
  try {
    const Dictionary = await Dictionary.find({ _id: id });
    if (!Dictionary) {
      return res.status(400).send({ messege: "Dictionary not found" });
    }
    res.json({ Dictionary });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateId = async (req, res) => {
  try {
    const { term, letter } = req.body;
    const update = await Department.updateOne({ _id: req.params.id }, [
      { $set: { term: term, letter: letter } },
    ]);
    if (!update) {
      return res.status(400).send({ message: "Wrong id dictionary not found" });
    }
    res.json({ update });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteId = async (req, res) => {
  try {
    const dictionary = await Dictionary.deleteOne({ _id: req.params.id });
    if (!dictionary) {
      return res.status(400).send({ message: "Wrong id Dictionary not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  add,
  getAll,
  getByid,
  updateId,
  deleteId,
};
