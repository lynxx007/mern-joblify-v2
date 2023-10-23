import { Router } from "express";
import { createJob, getAllJobs, updateJob, deleteJob, getJobById, showStats } from "../controllers/jobController.js";
import { validateJobInput } from "../middlewares/validations.js";

const router = Router()

router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, createJob)

router.route('/stats').get(showStats)
router.route('/:id').get(getJobById).patch(validateJobInput, updateJob).delete(deleteJob)

export default router