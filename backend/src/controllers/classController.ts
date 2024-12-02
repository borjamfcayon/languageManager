import { Request, Response } from 'express';
import Class from '../models/Class';

export const getAllClasses = async (req: Request, res: Response) => {
    try {
        const classes = await Class.find().populate('schedule');
        res.status(200).json(classes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const createClass = async (req: Request, res: Response) => {
    try {
        const { language, teacher, schedule } = req.body;
        const newClass = await Class.create({ language, teacher, schedule });
        res.status(201).json(newClass);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
