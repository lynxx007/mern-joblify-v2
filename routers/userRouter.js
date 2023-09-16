import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";

const router = Router();

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats')
router.patch('/update-user')

export default router