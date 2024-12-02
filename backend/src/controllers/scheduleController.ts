import { Request, Response } from 'express';
import Schedule from '../models/Schedule';

export const createSchedule = async (req: Request, res: Response) => {
    try {
        const { day, hours } = req.body;
        const schedule = await Schedule.create({ day, hours });
        res.status(201).json(schedule);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
};
