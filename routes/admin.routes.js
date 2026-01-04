const express = require('express');
const db = require('../database/database');

const router = express.Router();

// View all orders (admin)
router.get('/orders', (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Update order status (admin)
router.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  db.run(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, orderId],
    function (err) {
      if (err) return res.status(500).json(err);
      if (this.changes === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order status updated" });
    }
  );
});

module.exports = router;
