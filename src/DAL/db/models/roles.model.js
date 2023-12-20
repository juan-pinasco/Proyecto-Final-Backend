import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true, //fecha de creacion
    versionKey: false, //para que no aparezca "__V"
  }
);

export const rolesModel = mongoose.model("Role", usersSchema);
