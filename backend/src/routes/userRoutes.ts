import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rutas para obtener, actualizar y eliminar usuarios
router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;
