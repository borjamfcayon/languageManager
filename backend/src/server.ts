import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import classRoutes from './routes/classRoutes';
import scheduleRoutes from './routes/scheduleRoutes';

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/classes', classRoutes); // Rutas de clases
app.use('/api/schedules', scheduleRoutes); // Rutas de horarios

// Manejo de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
