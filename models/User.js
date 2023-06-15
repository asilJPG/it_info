const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_phone: {
      type: String,
    },
    user_info: {
      type: String,
    },
    user_photo: {
      type: String,
    },
    is_active: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = model("User", userSchema);
