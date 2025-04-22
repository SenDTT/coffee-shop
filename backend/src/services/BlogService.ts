import { BlogModel } from "../models/Blog";

export const getAllBlogs = async (
  filter: Record<string, any>,
  skip: number = 0,
  limit: number = 10
) => {
  try {
    const results = await BlogModel.find(filter)
      .populate("category", "name description _id")
      .populate("author", "name _id")
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await BlogModel.countDocuments(filter);
    return { data: results, total };
  } catch (err) {
    console.log("Adding new Blog failed: ", err);
    throw err;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const blog = await BlogModel.findById(id);
    if (blog == null) {
      throw new Error("Blog is not existed");
    }
    await blog.populate("category", "name description _id");
    await blog.populate("author", "name _id");
    return blog;
  } catch (err) {
    console.log("Fetching a Blog failed: ", err);
    throw err;
  }
};
