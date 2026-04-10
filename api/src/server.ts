
import createApp from './app';
import { testConnection } from './config/database';
import env from './config/env';

const startServer = async () => {
    try {
        // Test database connection
        await testConnection();

        // Create app
        const app = createApp();

        // Start server
        app.listen(env.port, () => {
            console.log(`Server started at: http://localhost:${env.port}/api`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();