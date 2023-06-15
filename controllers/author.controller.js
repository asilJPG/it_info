const { errorHandler } = require("../helpers/error_handler");
const Joi = require("joi");
const Author = require("../models/Author");
const { authorValidation } = require("../validations/author.validation");

const bcrypt = require("bcrypt");

const createAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      is_expert,
      author_photo,
      author_position,
      author_info,
      author_phone,
      author_email,
      author_password,
      author_last_name,
      author_first_name,
    } = value;
    // if (error) {
    //   return res.status(400).send({ message: error.details[0].message });
    // }
    const author = await Author.findOne({ author_email });
    if (author) {
      return res.status(400).send({ message: "Bunday author bazada mavjud" });
    }
    const hashedPassword = await bcrypt.hashSync(author_password, 7);
    const newAuthor = await Author({
      is_expert,
      author_photo,
      author_position,
      author_info,
      author_phone,
      author_email,
      author_password: hashedPassword,
      author_last_name,
      author_first_name,
    });
    // await newAuthor.validate();
    await newAuthor.save();
    res.status(200).send({ message: "Yangi author qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const author = await Author.find({});
    if (!Author) {
      res.status(400).send({ messege: "Collections not found" });
    }
    res.json({ author });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { author_email, author_password } = req.body;
    const author = await Author.findOne({ author_email });
    if (!author) {
      return res.status(400).send({ message: "wrong password or email" });
    }
    const validPassword = bcrypt.compareSync(
      author_password, //bu ochiq password
      author.author_password //bu heshlangan password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "wrong password or email" });
    }
    res.status(200).send({ message: "Welcome :)" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getByid = async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    if (!author) {
      return res.status(400).send({ message: "Wrong id" });
    }
    res.send(author);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateId = async (req, res) => {
  try {
    const {
      is_expert,
      author_photo,
      author_position,
      author_info,
      author_phone,
      author_last_name,
      author_first_name,
    } = req.body;
    const updatedRes = await Author.updateOne(
      { _id: req.params.id },
      {
        $set: {
          is_expert: is_expert,
          author_phone: author_phone,
          author_last_name: author_last_name,
          author_first_name: author_first_name,
          author_position: author_position,
          author_info: author_info,
          author_photo: author_photo,
        },
      }
    );
    await updatedRes.save();
    res.send({ message: "Author updateed successfully" });
  } catch (error) {}
};

const deleteId = async (req, res) => {
  try {
    const author = Author.deleteOne({ _id: req.params.id });
    if (!author) {
      return res.status(400).send({ message: "Wrong id Aurthor not found" });
    }
    res.send({ message: "Authtor successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAll,
  createAuthor,
  loginAuthor,
  getByid,
  deleteId,
  updateId,
};
