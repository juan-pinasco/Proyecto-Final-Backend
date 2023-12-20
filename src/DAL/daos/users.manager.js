import { usersModel } from "../db/models/users.model.js";

class UsersManager {
  async findAll() {
    try {
      const allUsers = await usersModel.find();
      return allUsers;
    } catch (error) {
      return error;
    }
  }

  async findId(_id) {
    try {
      const user = await usersModel.findById(_id).populate("roles", ["name"]);
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await usersModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await usersModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const usersManager = new UsersManager();
