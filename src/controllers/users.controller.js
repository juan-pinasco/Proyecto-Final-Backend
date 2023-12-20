import * as userService from "../service/users.service.js";
import { rolesModel } from "../DAL/db/models/roles.model.js";

//--->GET /api/users/
export const getUsers = async (req, res) => {
  try {
    const users = await userService.findAlls();
    //res.status(201).json(users);
    res.status(201).render("users/listUsers", { users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.findById(req.params.uid);
    if (!user) {
      res.status(200).json({ message: "Invalid ID" });
    } else {
      res.status(201).render("users/detailsUsers", { user });
      //res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const user = await userService.update(req.params.uid, req.body);
    res.status(201).render("users/detailsUsers", { user });
    //res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deleteUser = await userService.deleted(req.params.uid);
    //res.status(200).json({ message: "User Delete", user: deleteUser });
    res.status(200).redirect("/api/homeProfile");
  } catch (error) {
    res.status(500).json({ error });
  }
};
