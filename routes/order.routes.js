const express = require('express');
const db = require('../database/database');
const authenticateToken = require('./middleware/auth');

const router = express.Router();

// Place an order (protected)
router.post('/', authenticateToken, (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.userId; // from JWT

  db.run(
    `INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)`,
    [user_id, product_id, quantity],
    function(err) {
      if(err) return res.status(500).json(err);
      res.json({ message: "Order placed successfully", orderId: this.lastID });
    }
  );
});

// Get all orders for logged-in user
router.get('/my', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  db.all(
    `SELECT orders.id, products.name AS product_name, orders.quantity, orders.status
     FROM orders
     JOIN products ON orders.product_id = products.id
     WHERE orders.user_id = ?`,
    [userId],
    (err, rows) => {
      if(err) return res.status(500).json(err);
      if(rows.length === 0) return res.status(404).json({ message: "No orders found" });
      res.json(rows);
    }
  );
});

module.exports = router;
