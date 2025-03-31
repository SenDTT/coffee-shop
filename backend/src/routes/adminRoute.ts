import { Router } from "express";
import {
  authenticate,
  isAdminUser,
} from "../middlewares/AuthMiddleware";
import { upload } from "../utils/multerUtil";
import { adminGetAllOrdersController, getAllUsersController, updateUserInfoController, updateUserRoleController, uploadProfileImageController } from "../controllers/AccountController";

const router = Router();

router.use(authenticate, isAdminUser);

// user account activities
router.put("/update-profile", updateUserInfoController);
router.put("/upload-image", upload.single("image"), uploadProfileImageController);

// manage users
router.get("/users", getAllUsersController);
router.put("/users/:id/role", updateUserRoleController);

// manage orders
router.get("/orders", adminGetAllOrdersController);

export default router;
