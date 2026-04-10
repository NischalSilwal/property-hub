import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
    port: number;
    nodeEnv: string;
    db: {
        host: string;
        port: number;
        user: string;
        password: string;
        name: string;
    };
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
}

const env: EnvConfig = {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER || 'property_hub_user',
        password: process.env.DB_PASSWORD || 'property_hub_pass',
        name: process.env.DB_NAME || 'property_hub_db',
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'default_access_secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '20m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
};

export default env;
