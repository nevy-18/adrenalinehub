const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


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

// Registration Endpoint
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
app.post('/login', (req, res) => {
    console.log("--- LOGIN ATTEMPT RECEIVED ---");
    console.log("Body:", req.body); 

    const { email, username, password } = req.body;
    
    
    let identifier = email || username;

  //Remove empty spaces (Trimming)
    if (identifier) identifier = identifier.toString().trim();
    const cleanPassword = password ? password.toString().trim() : '';

    console.log("Identifier used for SQL:", identifier);
    console.log("Password used for SQL:", cleanPassword);

    if (!identifier || !cleanPassword) {
        return res.status(400).send({ message: 'Missing credentials' });
    }
    
    // 3. The Query
    const sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?";
    
    db.query(sql, [identifier, identifier, cleanPassword], (err, results) => {
        if (err) {
            console.error("SQL ERROR:", err);
            res.status(500).send({ message: 'Server error' });
        } else {
            console.log("SQL Results found:", results.length); 

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

app.listen(3001, () => {
    console.log('Server running on port 3001');
});