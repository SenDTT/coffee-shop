import { InferSchemaType, model, Schema } from "mongoose";

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users", requried: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true },
    }],
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    trackingNumber: { type: String },
    trackingUrl: { type: String },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    totalItems: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["draft", "paid", "refunded", "shipped", "deleted"], default: "draft"},
}, { timestamps: true });

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;
export type Order = OrderSchemaType & { _id: Schema.Types.ObjectId };

export const OrderModel = model<Order>("orders", OrderSchema);