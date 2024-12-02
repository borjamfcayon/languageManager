import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || '') as string | JwtPayload;
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
