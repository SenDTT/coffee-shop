import { Schema, InferSchemaType, model } from "mongoose";

// Define the schema
const SettingSchema: Schema = new Schema(
  {
    group: { type: String, required: true, trim: true },
    key: { type: String, required: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// Create a unique index to prevent duplicate keys in the same group
SettingSchema.index({ group: 1, key: 1 }, { unique: true });

// Export the model
export type SettingSchemaType = InferSchemaType<typeof SettingSchema>;
export type Setting = SettingSchemaType & { _id: Schema.Types.ObjectId };

export const SettingModel = model<Setting>("settings", SettingSchema);
