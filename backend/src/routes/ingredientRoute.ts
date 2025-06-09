import { Router } from "express";
import { authenticate, isAdminUser } from "../middlewares/AuthMiddleware";
import {
  add_ingredient_validator,
  is_existed_validator,
} from "../middlewares/IngredientMiddleware";
import { upload } from "../utils/multerUtil";
import {
  activeOrDeactiveIngredientController,
  addIngredientController,
  addIngredientImageController,
  deleteIngredientController,
  deleteIngredientImageController,
  deleteMultiIngredientsController,
  getAllIngredientsController,
  getIngredientController,
  updateIngredientController,
} from "../controllers/IngredientController";

const router = Router();

router.use(authenticate, isAdminUser);

router.get("/", getAllIngredientsController);
router.get("/:id", is_existed_validator, getIngredientController);

router.post(
  "/",
  upload.array("images"),
  add_ingredient_validator,
  addIngredientController
);

router.put(
  "/:id",
  is_existed_validator,
  upload.array("images"),
  add_ingredient_validator,
  updateIngredientController
);
router.delete("/:id", is_existed_validator, deleteIngredientController);
router.post("/delete-multiple", deleteMultiIngredientsController);
router.put(
  "/:id/active",
  is_existed_validator,
  activeOrDeactiveIngredientController
);
router.put(
  "/:id/upload-images",
  is_existed_validator,
  upload.array("images", 5),
  addIngredientImageController
);
router.put(
  "/:id/images",
  is_existed_validator,
  deleteIngredientImageController
);

export default router;
