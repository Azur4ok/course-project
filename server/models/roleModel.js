import mongoose from "mongoose";

const {Schema, model} = mongoose;

const UserRole = new Schema({
  value: { type: String, unique: true, default: "user" }
});

export const Role = model("Role", UserRole);

