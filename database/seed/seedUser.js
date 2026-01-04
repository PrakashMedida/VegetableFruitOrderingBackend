const db = require('../../database/database');
const bcrypt = require('bcryptjs');

const password = '123456';
const hashedPassword = bcrypt.hashSync(password, 10);

db.run(
  `INSERT OR IGNORE INTO users (name, email, password) VALUES (?, ?, ?)`,
  ['Prakash', 'prakash@example.com', hashedPassword],
  function (err) {
    if (err) console.error(err.message);
    else console.log('User created with ID:', this.lastID);
  }
);
