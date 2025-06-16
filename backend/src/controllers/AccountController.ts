import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import {
  activeOrDeactiveSubcribedEmail,
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserRole,
  uploadProfileImage,
} from "../services/UserService";
import { UserRoles } from "../constants/Enum";
import { ISignupBody } from "../types/AuthTypes";
import {
  createNewOrder,
  getAllOrders,
  getOrderDetail,
} from "../services/OrderService";
import { IOrderRequest } from "../types/OrderTypes";
import { getProductById } from "../services/ProductService";

export const updateUserInfoController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  ISignupBody
> = async (req, res, next) => {
  try {
    const { id } = (req as any).user;
    await updateUserInfo(id, req.body);

    const user = await getUserById(id);

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const getUserByIdController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const id = (req as any).user?.id;
  try {
    const user = await getUserById(id);
    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "Account is not existed." });
      return;
    }

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const uploadProfileImageController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const id = (req as any).user?.id;
  try {
    const newModel = await getUserById(id);
    if (!newModel) {
      res
        .status(404)
        .json({ success: false, message: "Account is not existed." });
      return;
    }

    const newImages = req.file as Express.Multer.File;
    if (newImages) {
      await uploadProfileImage(id, newImages.path);
    }
    const user = await getUserById(id);

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const getAllUsersController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { limit: number; skip: number; search?: string }
> = async (req, res, next) => {
  try {
    const { limit, skip, search } = req.query;

    const filter: Record<string, any> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const data = await getAllUsers(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateUserRoleController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      res.status(400).json({ success: false, message: "User is not existed" });
      return;
    }
    const role = user.role === UserRoles.user ? "admin" : "user";
    await updateUserRole(id, role);

    res.json({ success: true, data: { ...user, role } });
  } catch (err) {
    next(err);
  }
};

export const activeOrDeactiveSubcribedEmailController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const user = (req as any).user;

    const newValue = user.subcribedEmail === 0 ? 1 : 0;
    await activeOrDeactiveSubcribedEmail(user.id, newValue);

    res.json({ success: true, data: { ...user, subcribedEmail: newValue } });
  } catch (err) {
    next(err);
  }
};

export const adminGetAllOrdersController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { skip: number; limit: number; search?: string }
> = async (req, res, next) => {
  const { skip, limit, search } = req.query;

  try {
    const filter: Record<string, any> = {};

    const data = await getAllOrders(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const adminGetOrdersByUserController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { skip: number; limit: number; search?: string }
> = async (req, res, next) => {
  const { skip, limit, search } = req.query;
  const { id } = (req as any).user;

  try {
    const filter: Record<string, any> = {};

    if (id) {
      filter.user = id;
    }

    const data = await getAllOrders(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getOrderDetailController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await getOrderDetail(id);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const addNewOrderController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IOrderRequest
> = async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { product, price, quantity } = req.body;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const productModel = await getProductById(product);
    if (!productModel) {
      res
        .status(400)
        .json({ success: false, message: "Product is not existed" });
      return;
    }

    const data = await createNewOrder({
      user,
      products: [{ product: productModel._id, quantity }],
      totalAmount: Number(price) * quantity,
      status: "draft",
    });

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateOrderController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  IOrderRequest
> = async (req, res, next) => {
  const { id } = req.params;
  const { product, quantity } = req.body;

  try {
    const order = await getOrderDetail(id, false);
    if (!order) {
      res.status(400).json({ success: false, message: "Order does not exist" });
      return;
    }

    // Check if the product already exists in the order
    const existingProduct = order.products.find(
      (prod) => prod.product.toString() === product
    );

    if (existingProduct) {
      // Update quantity if the product exists
      existingProduct.quantity = quantity;
    } else {
      // Fetch product details before adding
      const newProd = await getProductById(product);
      if (!newProd) {
        res.status(400).json({ success: false, message: "Product not found" });
        return;
      }

      order.products.push({
        product: newProd._id,
        quantity,
      });
    }

    // Calculate total amount
    const totalAmount = await order.products.reduce(
      async (sumPromise, prod) => {
        const sum = await sumPromise;
        const prodDetails = await getProductById(prod.product.toString());
        return (
          sum +
          (prodDetails ? Number(prodDetails.price) * Number(prod.quantity) : 0)
        );
      },
      Promise.resolve(0)
    );

    // Update total amount
    order.totalAmount = totalAmount;

    // Save the order (since we modified a DocumentArray, we need to call .save())
    await order.save();

    res.json({ success: true, message: "Order updated successfully" });
  } catch (err) {
    next(err);
  }
};

// only upload image
export const uploadImageController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const newImages = req.file as Express.Multer.File;
    if (!newImages) {
      res.status(400).json({ success: false, message: "No image uploaded" });
      return;
    }

    res.json({ success: true, data: { url: newImages.path } });
  } catch (err) {
    next(err);
  }
}
// Compare this snippet from frontend/components/Admin/BlogEditor.tsx:
