const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  author_first_name: {
    type: String,
    required: true,
    trim: true,
  },
  author_last_name: {
    type: String,
    trim: true,
  },
  author_password: {
    type: String,
    required: true,
  },
  author_email: {
    type: String,
    required: true,
    unique: true,
  },
  author_phone: {
    type: String,
  },
  author_info: {
    type: String,
  },
  author_position: {
    type: String,
  },
  author_photo: {
    type: String,
  },
  is_expert: {
    type: String,
  },
});

module.exports = model("Author", authorSchema);
