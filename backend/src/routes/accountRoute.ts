import { Router } from "express";
import {
  authenticate,
} from "../middlewares/AuthMiddleware";
import { upload } from "../utils/multerUtil";
import { activeOrDeactiveSubcribedEmailController, addNewOrderController, adminGetOrdersByUserController, getAllUsersController, getOrderDetailController, updateOrderController, updateUserInfoController, updateUserRoleController, uploadProfileImageController } from "../controllers/AccountController";
import { has_no_draft_order_validator, order_is_existed_validator } from "../middlewares/OrderMiddleware";

const router = Router();

router.use(authenticate);

// user account activities
router.put("/update-profile", updateUserInfoController);
router.put("/upload-image", upload.single("image"), uploadProfileImageController);
router.get("/subscribe-email", activeOrDeactiveSubcribedEmailController);

// manage orders
router.get("/orders", adminGetOrdersByUserController);
router.post("/orders", has_no_draft_order_validator, addNewOrderController);
router.put("/orders/:id", order_is_existed_validator, updateOrderController);
router.get("/orders/:id", order_is_existed_validator, getOrderDetailController);

// checkout


export default router;
