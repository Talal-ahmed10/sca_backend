import express from "express";
import {
  avatarURL,
  avatarUploadURL,
  getOne,
  remove,
  update,
} from "../controllers/user.controller";
import { userAuth } from "../middleware/userAuth";
import { validateUpdate } from "../validation/user.validation";

const router = express.Router();

router.get("/", userAuth, getOne);
router.get("/avatar-upload-url", userAuth, avatarUploadURL);
router.get("/avatar-url", userAuth, avatarURL);
router.patch("/", userAuth, validateUpdate, update);
router.delete("/", userAuth, remove);


module.exports = router;