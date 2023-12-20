import { usersModel } from "../DAL/db/models/users.model.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await usersModel.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "user already exist" });

  const email = await usersModel.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "email already exist" });

  next();
};

//-----------------------------------------------------para usarlo cuando el admin quiera modificar el rol de un usuario. 2:05:00
const ROLES = ["user", "premium", "admin"];

export const checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.lenght; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .json({ message: `Role ${req.body.roles[i]} does not exist` });
      }
    }
  }
  next();
};
