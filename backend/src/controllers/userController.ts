import { Request, Response } from 'express';
import User from '../models/User';

/**
 * Obtiene un usuario por ID.
 * Solo usuarios autenticados pueden acceder a esta información.
 */
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Asegúrate de que el ID del usuario exista
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

/**
 * Actualiza un usuario por ID.
 * Solo usuarios autenticados pueden actualizar su propia información.
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validar si el ID del usuario es válido
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Comprobar si el usuario tiene autorización (opcional)
        if (req.user && typeof req.user === 'object' && req.user._id !== id) {
            return res.status(403).json({ message: 'You are not authorized to update this user' });
        }

        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

/**
 * Elimina un usuario por ID.
 * Solo el usuario autenticado puede eliminar su propia cuenta.
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validar si el ID del usuario es válido
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Comprobar si el usuario tiene autorización (opcional)
        if (req.user && typeof req.user === 'object' && req.user._id !== id) {
            return res.status(403).json({ message: 'You are not authorized to delete this user' });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
