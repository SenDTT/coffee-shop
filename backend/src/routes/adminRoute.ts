import { Router } from "express";
import { authenticate, isAdminUser } from "../middlewares/AuthMiddleware";
import { upload } from "../utils/multerUtil";
import {
  getUserByIdController,
  adminGetAllOrdersController,
  getAllUsersController,
  updateUserInfoController,
  updateUserRoleController,
  uploadProfileImageController,
  uploadImageController,
} from "../controllers/AccountController";
import {
  getSettingsController,
  updateSettingsController,
  updateHomepageSettingsController,
} from "../controllers/SettingsController";

const router = Router();

// settings routes
router.get("/settings", getSettingsController);

router.use(authenticate, isAdminUser);

// user account activities
router.put("/update-profile", updateUserInfoController);
router.put(
  "/upload-image",
  upload.single("image"),
  uploadProfileImageController
);

// manage users
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.put("/users/:id/role", updateUserRoleController);

// manage orders
router.get("/orders", adminGetAllOrdersController);

// settings routes
router.put(
  "/settings",
  updateSettingsController
);

router.put(
  "/settings/homepage",
  upload.single("heroImage"),
  updateHomepageSettingsController
);

router.post("/upload", upload.single("file"), uploadImageController);

export default router;
