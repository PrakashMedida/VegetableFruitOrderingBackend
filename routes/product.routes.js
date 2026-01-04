const express = require('express');
const db = require('../database/database');

const router = express.Router();

// GET all products
router.get('/', (req, res) => {
  try{
    db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
  }
  catch(e){
    console.log("error :"+e);
  }
  
});

module.exports = router;
