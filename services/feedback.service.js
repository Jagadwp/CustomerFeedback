import dbPool from '../db/connection.js';
import { v4 as uuidv4 } from 'uuid';

// Create a MySQL connection pool
const pool = dbPool;

const generateUUID = () => {
    const uuid = uuidv4();
    return uuid;
};

export const index = (req, res) => {
    pool.query('SELECT * FROM feedbacks', (error, results) => {
        if (error) {
            console.error('Error retrieving feedbacks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ feedbacks: results });
        }
    });
};

export const insert = (req, res) => {
    const { purchase_id, star_rating, additional_feedback } = req.body;

    // Use UUID as string representation of QR Code
    const qr_code = generateUUID();
    const feedback = { purchase_id, qr_code, star_rating, additional_feedback };

    if (!purchase_id || !star_rating) {
        return res.status(400).json({ error: 'purchase_id and star_rating are required fields' });
    }

    // Check if the related purchase is not completed
    pool.query('SELECT is_completed FROM purchases WHERE id = ?', purchase_id, (error, results) => {
        if (error) {
            console.error('Error retrieving purchase:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Related purchase not found' });
        }

        const { is_completed } = results[0];
        if (!is_completed) {
            return res.status(400).json({ error: 'The related purchase is still not finished' });
        }

        // Insert the feedback into the database
        pool.query('INSERT INTO feedbacks SET ?', feedback, (error, result) => {
            if (error) {
                console.error('Error inserting feedback:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Entity not found' });
            } else {
                res.status(201).json({ feedbackId: result.insertId });
            }
        });
    });
};

