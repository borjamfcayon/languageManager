import { Router } from 'express';
import { createSchedule } from '../controllers/scheduleController';

const router = Router();

router.post('/', createSchedule);

export default router;
