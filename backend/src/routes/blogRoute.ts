import { Router } from "express";
import {
  addBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
} from "../controllers/BlogController";
import { add_blog_validator, is_existed_blog_validator } from "../middlewares/BlogMiddleware";
import { authenticate, isAdminUser } from "../middlewares/AuthMiddleware";

const routes = Router();

routes.get("/", getAllBlogsController);
routes.get("/:id", is_existed_blog_validator, getBlogByIdController);

routes.use(authenticate, isAdminUser);

routes.post("/", add_blog_validator, addBlogController);
routes.put("/:id", is_existed_blog_validator, updateBlogController);
// routes.delete("/:id", is_existed_blog_validator, deleteBlogController);
// routes.put("/:id/active", is_existed_blog_validator, activeOrDeactiveBlogController);
// routes.put("/:id/upload-images", is_existed_blog_validator, upload.array('images', 5), addBlogImageController);
// routes.put("/:id/images", is_existed_blog_validator, deleteBlogImageController);
// routes.get("/search", searchBlogController);
// routes.get("/category/:id", is_existed_blog_validator, getBlogsByCategoryController);
// routes.get("/author/:id", is_existed_blog_validator, getBlogsByAuthorController);
// routes.get("/tag/:id", is_existed_blog_validator, getBlogsByTagController);
// routes.get("/latest", getLatestBlogsController);
// routes.get("/popular", getPopularBlogsController);
// routes.get("/related/:id", is_existed_blog_validator, getRelatedBlogsController);
// routes.get("/archive", getArchiveBlogsController);

export default routes;