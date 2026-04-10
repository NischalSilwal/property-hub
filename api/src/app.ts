import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const createApp = (): Application => {
    const app = express();

    // Parse JSON bodies
    app.use(express.json({ limit: '10mb' }));

    // Parse URL-encoded bodies
    app.use(express.urlencoded({ extended: true }));

    // Parse cookies
    app.use(cookieParser());

    // Enable CORS
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        })
    );

    // Mount routes
    app.use('/api', routes);

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({ error: 'Route not found' });
    });

    // Global error handler
    app.use(errorHandler);

    return app;
};

export default createApp;