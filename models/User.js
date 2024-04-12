const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./database.db');

const User = {
  // Method to create a new user
  create: async function (username, password, fullName, email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (username, password, fullName, email) VALUES (?, ?, ?, ?)', [username, hashedPassword, fullName, email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username: username, fullName: fullName, email: email });
        }
      });
    });
  },
  getAllUsers: function () {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  getUserById: function (userId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  
  // Method to find a user by username
  findByUsername: function (username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  // Method to find a user by email
  findByEmail: function (email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  findById: function (id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  findByUsernameOrEmail: function (usernameOrEmail) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  // Method to validate user password
  validatePassword: async function (user, password) {
    return bcrypt.compare(password, user.password);
  }
};

module.exports = User;
