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
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database: ' + process.env.DB_NAME);
});

// 1. Data Save Endpoint (POST)
//app.post('/api/save', (req, res) => {
//Before making changes in below code, uper code was here 
//  const response = fetch('https://my-dynamic-project.onrender.com/api/save'), (req, res) => {
app.post('/some-route', async (req, res) => {
    const response = await fetch('https://my-dynamic-project.onrender.com/api/save');
    const data = await response.json();
    res.json(data);
});

    const { field1, field2 } = req.body;
    const query = 'INSERT INTO users (field1, field2) VALUES (?, ?)';
       db.query(query, [field1, field2], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data successfully saved online!' });
    });

// 2. Data Fetch Endpoint (GET)
//app.get('/api/show', (req, res) => {
//Before making changes in below code, uper code was here
//    const response = await fetch('https://my-dynamic-project.onrender.com/api/save'), (req, res) => {
app.get('/some-route', async (req, res) => {
    const response = await fetch('https://my-dynamic-project.onrender.com/api/save');
    const data = await response.json();
    res.json(data);
});
        //const userquery = 'SELECT * FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    });