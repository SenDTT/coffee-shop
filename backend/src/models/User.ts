import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: { type: String },
    subcribedEmail: { type: Number, enum: [0, 1], default: 1 },
  },
  { timestamps: true }
);

export type UserSchemaType = InferSchemaType<typeof UserSchema>;
export type User = UserSchemaType & { _id: Schema.Types.ObjectId };

export const UserModel = model<User>("users", UserSchema);