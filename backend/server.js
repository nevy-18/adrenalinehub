const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// 1. Database Connection
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

// --- AUTHENTICATION ROUTES ---

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err) => {
        if (err) return res.status(500).send('Error saving user');
        res.status(200).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { email, username, password } = req.body;
    let identifier = (email || username || "").toString().trim();
    const cleanPassword = (password || "").toString().trim();

    const sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?";
    db.query(sql, [identifier, identifier, cleanPassword], (err, results) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (results.length > 0) {
            res.status(200).send({ message: 'Login successful', username: results[0].username });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    });
});

// --- USER-SPECIFIC ORDER ROUTES ---

// GET Orders: Fetch history for a specific user
app.get('/orders/:username', (req, res) => {
    const { username } = req.params;
    const sql = `
        SELECT o.id, o.total_price as price, o.status, o.delivery_date, o.created_at as date,
               (SELECT product_name FROM order_items WHERE order_id = o.id LIMIT 1) as items,
               (SELECT image_url FROM order_items WHERE order_id = o.id LIMIT 1) as image,
               (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as quantity
        FROM orders o
        JOIN users u ON o.user_id = u.id
        WHERE u.username = ?
        ORDER BY o.created_at DESC
    `;
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST Order: Place a New Order (Calculates in Pesos ₱)
app.post('/orders', (req, res) => {
    const { username, items, total_price, points_earned } = req.body;
    db.query("SELECT id FROM users WHERE username = ?", [username], (err, userResults) => {
        if (err || userResults.length === 0) return res.status(404).json({ message: "User not found." });

        const userId = userResults[0].id;
        const orderSql = `INSERT INTO orders (user_id, total_price, points_earned, status, delivery_date) 
                          VALUES (?, ?, ?, 'Processing', 'Est: 5 Days')`;
        
        db.query(orderSql, [userId, total_price, points_earned], (err, orderResult) => {
            if (err) return res.status(500).json({ error: err.message });

            const orderId = orderResult.insertId;
            const orderItemsData = items.map(item => [
                orderId, item.id, item.name, item.selectedSize || "One Size", 
                item.quantity || 1, item.price, item.image
            ]);

            const itemsSql = "INSERT INTO order_items (order_id, product_id, product_name, variant_name, quantity, price_at_purchase, image_url) VALUES ?";
            db.query(itemsSql, [orderItemsData], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Order placed successfully", orderId });
            });
        });
    });
});

// --- DYNAMIC CONTENT ROUTES ---

// 2. GET Popular Items: Based on real sales frequency
app.get('/api/popular-items', (req, res) => {
    const sql = `
        SELECT product_id, COUNT(product_id) AS occurrence 
        FROM order_items 
        GROUP BY product_id 
        ORDER BY occurrence DESC 
        LIMIT 5
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- ADMIN DASHBOARD ROUTES ---

// 3. GET Admin Stats: Global Revenue (₱) and User Count
app.get('/admin/stats', (req, res) => {
    const sql = `
        SELECT 
            (SELECT SUM(total_price) FROM orders) as totalRevenue,
            (SELECT COUNT(*) FROM users) as totalUsers,
            (SELECT COUNT(*) FROM orders WHERE status = 'Processing') as pendingOrders
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

// 4. GET All Orders: Comprehensive list for admin
app.get('/admin/all-orders', (req, res) => {
    const sql = `
        SELECT o.id, u.username as user, 
               (SELECT product_name FROM order_items WHERE order_id = o.id LIMIT 1) as items,
               o.status, o.total_price as amount, o.created_at
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 5. PATCH Order Status: Mark order as delivered
app.patch('/admin/orders/:id/complete', (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE orders SET status = 'Delivered', delivery_date = 'Delivered Today' WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order updated successfully" });
    });
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});