import { usersManager } from "../DAL/daos/users.manager.js";

export const findAlls = async () => {
  const users = await usersManager.findAll();
  return users;
};

export const findById = async (_id) => {
  const user = await usersManager.findId(_id);
  return user;
};

export const update = async (id, obj) => {
  const user = await usersManager.updateOne(id, obj);
  return user;
};

export const deleted = async (id) => {
  const response = await usersManager.deleteOne(id);
  return response;
};
