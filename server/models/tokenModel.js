import pkg from "mongoose";

const {Schema, model} = pkg;

const TokenModel = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { required: true, type: String }
});

const Token = model("Token", TokenModel);

export default Token;
