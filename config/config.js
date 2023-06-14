import dotenv from 'dotenv';

dotenv.config();

const getDatabaseConfig = () => {
    return {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
};

export const config = process.env;
export const dbConfig = getDatabaseConfig();
