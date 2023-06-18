const User = require("../models/User");
const { errorHandler } = require("../helpers/error_handler");
const bcrypt = require("bcrypt");
const config = require("config");
const myJwt = require("../services/JwtService");

const add = async (req, res) => {
  try {
    const {
      user_name,
      user_password,
      user_email,
      user_phone,
      user_photo,
      is_active,
    } = req.body;
    const hashedPassword = await bcrypt.hashSync(user_password, 7);
    const newUser = await User({
      user_name,
      user_password: hashedPassword,
      user_email,
      user_phone,
      user_photo,
      is_active,
    });
    await newUser.save();

    res.status(200).send({ message: "User successfully created" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      res.status(400).send({ messege: "Users not found" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).send({ message: "wrong password or email" });
    }
    const validPassword = bcrypt.compareSync(
      user_password, //bu ochiq password
      user.user_password //bu heshlangan password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "wrong password or email" });
    }
    // res.status(200).send({ message: "Welcome :)" });
    const payload = {
      id: user._id,
      is_active: user.is_active,
      userRoles: ["READ"],
    };
    console.log("tokens");
    const tokens = myJwt.generateToken(payload);
    console.log(tokens);
    user.user_token = tokens.refreshToken;
    await user.save;
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.status(200).send({ ...tokens });
  } catch (error) {
    errorHandler(res, error);
  }
};
const logOut = async (req, res) => {
  const { refreshToken } = req.cookies;
  let user;
  if (!refreshToken) {
    return res.status(400).send({ message: "Token not found" });
  }
  user = await User.findOneAndUpdate(
    { user_token: refreshToken },
    { user_token: "" },
    { new: true }
  );
  if (!user) {
    return res.status(400).send({ message: "Token topilmadi" });
  }
  res.cleanCookie("refreshToken");
  res.send({ user });
};

const getByid = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Wrong id" });
    }
    res.send(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  add,
  loginUser,
  getAll,
  getByid,
  logOut,
};
