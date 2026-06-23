require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Pool: ' + process.env.DB_NAME);
    connection.release();
});

// 1. Data Save Endpoint (POST)
app.post('/api/save', (req, res) => {
    const { field1, field2 } = req.body;
    const query = 'INSERT INTO users (field1, field2) VALUES (?, ?)';
    
    db.query(query, [field1, field2], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data successfully saved online!' });
    });
});

// 2. Data Fetch Endpoint (GET)
app.get('/api/show', (req, res) => {
    const query = 'SELECT * FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
