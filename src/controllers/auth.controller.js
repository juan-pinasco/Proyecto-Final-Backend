import { usersModel } from "../DAL/db/models/users.model.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { rolesModel } from "../DAL/db/models/roles.model.js";

//register
export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new usersModel({
    username,
    email,
    password: await usersModel.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await rolesModel.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await rolesModel.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();
  //console.log(savedUser);

  const token = jwt.sign({ id: savedUser._id }, config.secret_jwt, {
    expiresIn: 86400, //expira token en 24 horas
  });

  //res.status(200).json({ token });
  res.status(200).cookie("token", token).redirect("/api/homeProfile");
};

//login
export const sigin = async (req, res) => {
  const userFound = await usersModel
    .findOne({ email: req.body.email })
    .populate("roles", ["name"]);
  console.log(userFound);
  if (!userFound) return res.status(400).json({ message: "user not found" });

  const matchpassword = await usersModel.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchpassword)
    return res.status(401).json({ token: null, message: "invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.secret_jwt, {
    expiresIn: 86400, //expira token en 24 horas
  });
  //res.status(200).cookie("token", token).json({ message: "token generated" });
  res.status(200).cookie("token", token).redirect("/api/homeProfile");
};

//cerrar sesion
export const cookieDestroy = async (req, res) => {
  res.status(200).clearCookie("token").redirect("/api/home");
};
