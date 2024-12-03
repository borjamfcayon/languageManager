import { Router } from 'express'
import {
  signIn,
  signUp,
  verifyToken,
} from '../controllers/auth.controller'

const router = Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.post('/verify', verifyToken);

export default router;