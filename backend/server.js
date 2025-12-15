const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // <--- ENSURE THIS IS 3001

app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',      
    database: 'user_info'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// --- ROUTES ---

// 1. Registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving user');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});

// 2. Login
app.post('/login', (req, res) => {
    const { email, username, password } = req.body;
    let identifier = email || username;
    
    if (identifier) identifier = identifier.toString().trim();
    const cleanPassword = password ? password.toString().trim() : '';

    if (!identifier || !cleanPassword) {
        return res.status(400).send({ message: 'Missing credentials' });
    }
    
    const sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?";
    db.query(sql, [identifier, identifier, cleanPassword], (err, results) => {
        if (err) {
            console.error("SQL ERROR:", err);
            res.status(500).send({ message: 'Server error' });
        } else {
            if (results.length > 0) {
                res.status(200).send({ 
                    message: 'Login successful', 
                    username: results[0].username 
                });
            } else {
                res.status(401).send({ message: 'Invalid email/username or password' });
            }
        }
    });
});

// 3. Update Profile
app.post('/api/update-profile', (req, res) => {
    const { username, type, newEmail, currentPassword, newPassword } = req.body;
    const verifySql = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(verifySql, [username, currentPassword], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error' });
        if (results.length === 0) return res.status(401).json({ success: false, message: 'Incorrect current password' });

        if (type === 'email') {
            const updateEmailSql = "UPDATE users SET email = ? WHERE username = ?";
            db.query(updateEmailSql, [newEmail, username], (updateErr) => {
                if (updateErr) return res.status(500).json({ success: false, message: 'Failed to update email' });
                res.json({ success: true, message: 'Email updated successfully' });
            });
        } else if (type === 'password') {
            const updatePassSql = "UPDATE users SET password = ? WHERE username = ?";
            db.query(updatePassSql, [newPassword, username], (updateErr) => {
                if (updateErr) return res.status(500).json({ success: false, message: 'Failed to update password' });
                res.json({ success: true, message: 'Password updated successfully' });
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid update type' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});