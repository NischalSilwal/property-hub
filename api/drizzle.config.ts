import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/index.ts',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'propertyhub_user',
        password: process.env.DB_PASSWORD || 'propertyhub@12345',
        database: process.env.DB_NAME || 'property_hub_db',
    },
});
