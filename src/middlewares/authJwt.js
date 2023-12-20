import jwt from "jsonwebtoken";
import config from "../config.js";

import { rolesModel } from "../DAL/db/models/roles.model.js";
import { usersModel } from "../DAL/db/models/users.model.js";

//para que la ruta que se ejecute, verifique si existe un token. esto va a servir para todos los roles. ya que solo con hacerte una cuenta se te crea un token.
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "no token provide" });

    const decoded = jwt.verify(token, config.secret_jwt);
    req.userId = decoded.id;

    const user = await usersModel.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export const isPremium = async (req, res, next) => {
  const user = await usersModel.findById(req.userId);
  const roles = await rolesModel.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "premium") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "requires premium role" });
};

export const isAdmin = async (req, res, next) => {
  const user = await usersModel.findById(req.userId);
  const roles = await rolesModel.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "requires admin role" });
};
