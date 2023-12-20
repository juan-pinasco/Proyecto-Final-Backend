import { rolesModel } from "../DAL/db/models/roles.model.js";

export const createRoles = async () => {
  try {
    const count = await rolesModel.estimatedDocumentCount();

    if (count > 0) return;
    const values = await Promise.all([
      new rolesModel({ name: "user" }).save(),
      new rolesModel({ name: "premium" }).save(),
      new rolesModel({ name: "admin" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
