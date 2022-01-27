import mongoose from "mongoose";

const {Schema, model} = mongoose;

const UserModel = new Schema({
  username: { required: true, unique: true, type: String },
  password: { required: true, type: String },
  roles: [{type: String, ref: "Roles"}]
});

export const User = model("User", UserModel);

