import dbPool from '../db/connection.js';

// Create a MySQL connection pool
const pool = dbPool;

export const index = (req, res) => {
    pool.query('SELECT * FROM customers', (error, results) => {
        if (error) {
            console.error('Error retrieving customers:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ customers: results });
        }
    });
};

export const insert = (req, res) => {
    const { name, address, email, phone } = req.body;

    const customer = {
        name,
        address,
        email,
        phone
    };

    if (!name || !address) {
        return res.status(400).json({ error: 'Name and address are required fields' });
    }

    pool.query('INSERT INTO customers SET ?', customer, (error, result) => {
        if (error) {
            console.error('Error inserting customer:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ customerId: result.insertId });
        }
    });
};
