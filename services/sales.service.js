import dbPool from '../db/connection.js';

// Create a MySQL connection pool
const pool = dbPool;

export const index = (req, res) => {
    pool.query('SELECT * FROM sales', (error, results) => {
        if (error) {
            console.error('Error retrieving sales:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ sales: results });
        }
    });
};

export const insert = (req, res) => {
    const { name, email, phone } = req.body;
    const sales = { name, email, phone };

    if (!name) {
        return res.status(400).json({ error: 'Name are required fields' });
    }

    pool.query('INSERT INTO sales SET ?', sales, (error, result) => {
        if (error) {
            console.error('Error inserting sales:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ salesId: result.insertId });
        }
    });
};
