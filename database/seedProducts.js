const db = require('../database/database');

const products = [
  { name: "Wireless Mouse", price: 799 },
  { name: "Mechanical Keyboard", price: 2499 },
  { name: "USB-C Charger", price: 1299 },
  { name: "Bluetooth Headphones", price: 3499 },
  { name: "Laptop Stand", price: 1599 },
  { name: "Smart Watch", price: 4999 },
  { name: "External Hard Drive (1TB)", price: 5999 },
  { name: "Webcam HD", price: 2199 }
];

products.forEach((product) => {
  db.run(
    `INSERT INTO products (name, price) VALUES (?, ?)`,
    [product.name, product.price]
  );
});

console.log("Dummy products inserted successfully");
