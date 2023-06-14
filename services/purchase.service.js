import dbPool from '../db/connection.js';

// Create a MySQL connection pool
const pool = dbPool;

export const index = (req, res) => {
    pool.query('SELECT * FROM purchases', (error, results) => {
        if (error) {
            console.error('Error retrieving purchases:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ purchases: results });
        }
    });
};

export const insert = (req, res) => {
    const { customer_id, salesperson_id, is_completed, purchase_date, car_model, car_price } = req.body;

    const purchase = { customer_id, salesperson_id, is_completed, purchase_date, car_model, car_price };

    if (!customer_id || !salesperson_id || is_completed === undefined) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    pool.query('INSERT INTO purchases SET ?', purchase, (error, result) => {
        if (error) {
            console.error('Error inserting purchase:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ purchaseId: result.insertId });
        }
    });
};

export const update = (req, res) => {
    const { purchase_id } = req.params;
    const { ...updateValues } = req.body;

    if (!purchase_id) {
        return res.status(400).json({ error: 'purchase_id is required' });
    }

    if (Object.keys(updateValues).length === 0) {
        return res.status(400).json({ error: 'No update values provided' });
    }

    const query = 'UPDATE purchases SET ? WHERE id = ?';

    pool.query(query, [updateValues, purchase_id], (error, result) => {
        if (error) {
            console.error('Error updating purchase:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Purchase not found' });
        } else {
            res.status(200).json({ message: 'Purchase updated successfully' });
        }
    });
};
