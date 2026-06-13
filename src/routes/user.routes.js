import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  renewAccessToken,
  changePassword,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// SECURED ROUTES
router.route("/logout").post(verifyToken, logoutUser);
router.route("/refresh-token").post(renewAccessToken);
router.route("/change-password").post(verifyToken, changePassword);
router.route("/current-user").get(verifyToken, getCurrentUser);

export default router;
