import { OrderModel } from "../models/Order";
import { IOrderBody } from "../types/OrderTypes";

export const getAllOrders = async (
  filter: Record<string, any>,
  _skip: number = 0,
  _limit: number = 10
) => {
  try {
    const data = await OrderModel.find(filter)
      .populate("user", "name _id username email role")
      .populate({
        path: "products.product",
        select: "name _id price category images",
        populate: {
          path: "category",
          select: "name _id",
        },
      })
      .skip(_skip)
      .limit(_limit)
      .exec();
    const total = await OrderModel.countDocuments(filter);

    return { data, total };
  } catch (err) {
    console.log("Fetching orders failed: ", err);
    throw err;
  }
};

export const getOrderDetail = async (
  id: string,
  withRelative: boolean = true
) => {
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      throw new Error("Order is not existed");
    }

    if (withRelative) {
      await order.populate({
        path: "products.product",
        select: "name _id price category images",
        populate: {
          path: "category",
          select: "name _id",
        },
      });
    }

    return order;
  } catch (err) {
    console.log("Fetching order detail failed: ", err);
    throw err;
  }
};

export const getDraftOrderByUserId = async (userId: string) => {
  try {
    const order = await OrderModel.findOne({ user: userId, status: "draft" });

    return order;
  } catch (err) {
    console.log("Fetching order detail by user id failed: ", err);
    throw err;
  }
};

export const createNewOrder = async (data: IOrderBody) => {
  try {
    const order = await OrderModel.create(data);

    await order.populate({
      path: "products.product",
      select: "name _id price description category images",
      populate: {
        path: "category",
        select: "name _id",
      },
    });

    return order;
  } catch (err) {
    console.log("Creating new order failed: ", err);
    throw err;
  }
};

export const addOrUpdateProductOfOrder = async (
  id: string,
  data: Partial<IOrderBody>
) => {
  try {
    const results = await OrderModel.updateOne({ _id: id }, { $set: data });

    return results;
  } catch (err) {
    console.log("Creating new order failed: ", err);
    throw err;
  }
};
