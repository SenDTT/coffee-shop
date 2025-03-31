import { InferSchemaType, model, Schema } from "mongoose";

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users", requried: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["draft", "paid", "refunded", "deleted"], default: "draft"},
}, { timestamps: true });

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;
export type Order = OrderSchemaType & { _id: Schema.Types.ObjectId };

export const OrderModel = model<Order>("orders", OrderSchema);