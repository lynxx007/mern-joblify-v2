import { Router } from "express";
import { createJob, getAllJobs, updateJob, deleteJob, getJobById } from "../controllers/jobController.js";

const router = Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJobById).patch(updateJob).delete(deleteJob)

export default router