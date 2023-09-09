import { Router } from "express";
import { createJob, getAllJobs, updateJob, deleteJob } from "../controllers/jobController.js";

const router = Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getAllJobs).patch(updateJob).delete(deleteJob)

export default router