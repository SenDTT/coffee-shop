import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import { getDraftOrderByUserId, getOrderDetail } from "../services/OrderService";
import { IOrderRequest } from "../types/OrderTypes";

export const order_is_existed_validator: RequestHandler<{id: string}, IResponseData | IErrorResponse> = async (req, res, next) => {
    const {id} = req.params;

    const order = await getOrderDetail(id);
    if (!order) {
        res.status(400).json({ success: false, message: "Order is not existed" });
        return;
    }

    next();
}

export const has_no_draft_order_validator: RequestHandler<unknown, IResponseData | IErrorResponse, IOrderRequest> = async (req, res, next) => {
    const userId = (req as any).user?.id;

    const order = await getDraftOrderByUserId(userId);
    console.log(order);
    if (order) {
        res.status(400).json({success: false, message: "You can only have one draft order at a time. Please complete or delete your existing draft order before creating a new one."});
        return;
    }

    next();
}