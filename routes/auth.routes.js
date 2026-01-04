const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/database');

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // Use env variable in production

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if(err) return res.status(500).json(err);
    if(user) return res.status(400).json({ message: "Email already registered" });

    // Insert new user
    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      function(err){
        if(err) return res.status(500).json(err);
        res.json({ message: "User registered successfully", userId: this.lastID });
      }
    );
  });
});


// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({ message: "User not found" });

    // user.password should exist
    if (!user.password) return res.status(500).json({ message: "Password not set for this user" });

    // Use bcrypt.compareSync to avoid async issues inside SQLite callback
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});


module.exports = router;
