import { Router } from "express";
import {
  activeOrDeactiveCategoryController,
  addCategoryController,
  deleteCategoryController,
  deleteMultiCategoriesController,
  getAllCategoriesController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController";
import {
  add_category_validator,
  edit_category_validator,
  is_existed_validator,
} from "../middlewares/CategoryMiddleware";
import { authenticate, isAdminUser } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/", getAllCategoriesController);
router.get("/:id", is_existed_validator, getCategoryController);

router.use(authenticate, isAdminUser);

router.post("/", add_category_validator, addCategoryController);

router.put(
  "/:id",
  is_existed_validator,
  edit_category_validator,
  updateCategoryController
);
router.delete("/:id", is_existed_validator, deleteCategoryController);
router.post("/delete-multiple", deleteMultiCategoriesController);
router.put(
  "/:id/active",
  is_existed_validator,
  activeOrDeactiveCategoryController
);

export default router;
