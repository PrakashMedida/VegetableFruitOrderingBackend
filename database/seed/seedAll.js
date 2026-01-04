const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'database.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {

  // drop tables
  db.run(`DROP TABLE IF EXISTS orders`);
  db.run(`DROP TABLE IF EXISTS products`);
  db.run(`DROP TABLE IF EXISTS users`);

  // create users
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // create products
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER
    )
  `);

  // create orders
  db.run(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      status TEXT DEFAULT 'PLACED',
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);

  // seed users
  const hashedPassword = bcrypt.hashSync('123456', 10);

  db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    ['Prakash', 'prakash@example.com', hashedPassword]);

  db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    ['Raju', 'raju@example.com', hashedPassword]);

  // seed products
  const products = [
    ['Tomato', 40],
    ['Potato', 30],
    ['Apple', 120],
    ['Banana', 50],
    ['Carrot', 60]
  ];

  products.forEach(p => {
    db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, p);
  });

  // seed orders
  db.run(`INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)`,
    [1, 1, 5]);

  db.run(`INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)`,
    [2, 3, 2, 'SHIPPED']);

});

db.close();
console.log('Database seeded');
