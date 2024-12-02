import { Router } from 'express';
import { getAllClasses, createClass } from '../controllers/classController';

const router = Router();

router.get('/', getAllClasses);
router.post('/', createClass);

export default router;
