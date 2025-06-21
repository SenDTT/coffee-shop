import { RequestHandler } from "express";
import { getBlogById } from "../services/BlogService";
import { getCategoryById } from "../services/CategoryService";
import { IResponseData, IErrorResponse } from "../types/Common";

export const is_existed_blog_validator: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const blog = await getBlogById(id);
  if (!blog) {
    res.status(404).json({ success: false, message: "Blog is not existed." });
    return;
  }
  next();
};

export const add_blog_validator: RequestHandler<
  unknown,
  IErrorResponse | IResponseData,
  {
    title: string;
    content: string;
    category: string;
    tags?: string;
    image?: string;
  }
> = async (req, res, next) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
    return;
  }

  const aCategory = await getCategoryById(category);
  if (!aCategory) {
    res
      .status(404)
      .json({ success: false, message: "Category is not existed." });
    return;
  }
  next();
};
