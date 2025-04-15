import { RequestHandler } from "express";
import { getAllBlogs, getBlogById } from "../services/BlogService";
import { IErrorResponse, IResponseData } from "../types/Common";
import { extractMetaDescription, slugify } from "../utils/commonUtil";
import { BlogModel } from "../models/Blog";

export const getAllBlogsController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { limit: number; skip: number; search?: string }
> = async (req, res, next) => {
  try {
    const { skip, limit, search } = req.query;
    const filter: Record<string, any> = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const blogs = await getAllBlogs(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    if (blogs.total === 0) {
      res.status(404).json({ success: false, message: "No blogs found" });
      return;
    }
    res.json({ success: true, data: blogs });
  } catch (err) {
    next(err);
  }
};

export const getBlogByIdController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await getBlogById(id);
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog is not existed." });
      return;
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

export const addBlogController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { title: string; content: string; category: string }
> = async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { title, content, category } = req.body;

    const metaDescription = extractMetaDescription(content);
    const newBlog = new BlogModel({
      title,
      content,
      category,
      metaTitle: title,
      metaDescription,
      author: user._id,
    });
    const blog = await newBlog.save();

    const slug = `${slugify(title)}-${blog._id}`;

    blog.slug = slug;
    blog.metaUrl = `https://yourdomain.com/blog/${slug}`;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};
