const Joi = require("joi");

exports.authorValidation = (data) => {
  const schema = Joi.object({
    author_first_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .required(),
    author_last_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .required(),
    author_email: Joi.string().email(),
    author_phone: Joi.string().pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
    author_password: Joi.string().min(8).max(20),
    // confirm_password: Joi.string().ref("author_password"),
    author_info: Joi.string(),
    author_position: Joi.string(),
    author_photo: Joi.string().default("/author/avatar.jpg"),
    is_expert: Joi.boolean().default(false),

    // gender: Joi.string().valid("male", "female"),
    // birth_date: Joi.date().greater(new Date("2005-01-01")),
    // birth_year: Joi.number().integer().min(1990).max(2005),
    // reffered: Joi.boolean().required(),
    // referalDetails: Joi.string().when("reffered", {
    //   is: true,
    //   then: Joi.string().min(3).required(),
    //   otherwise: Joi.string().optional(),
    // }),
  });

  return schema.validate(data, { abortErly: false });
};
