import { Router } from "express";
import { authenticate, isAdminUser } from "../middlewares/AuthMiddleware";
import {
  activeOrDeactiveProductController,
  addProductController,
  addProductImageController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getProductController,
  updateProductController,
} from "../controllers/ProductController";
import {
  add_product_validator,
  is_existed_validator,
} from "../middlewares/ProductMiddleware";
import { upload } from "../utils/multerUtil";

const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", is_existed_validator, getProductController);

router.use(authenticate, isAdminUser);

router.post("/", add_product_validator, addProductController);

router.put(
  "/:id",
  is_existed_validator,
  add_product_validator,
  updateProductController
);
router.delete("/:id", is_existed_validator, deleteProductController);
router.put(
  "/:id/active",
  is_existed_validator,
  activeOrDeactiveProductController
);
router.put(
  "/:id/upload-images",
  is_existed_validator,
  upload.array('images', 5),
  addProductImageController
);
router.put(
  "/:id/images",
  is_existed_validator,
  deleteProductImageController
);

export default router;
