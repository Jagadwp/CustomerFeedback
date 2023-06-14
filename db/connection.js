import mysql from 'mysql';
import { dbConfig } from '../config/config.js';

const pool = mysql.createPool(dbConfig);

// Connect to the database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release(); // Release the connection after successful connection
});

export default pool;
