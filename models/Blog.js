// Import the necessary modules
const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('./database.db');

// Define the Blog schema
const Blog = {
  // Method to create a new blog post
  create: async function (title, content) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, title, content });
        }
      });
    });
  },

  // Method to retrieve all blog posts
  getAll: function () {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM blogs', [], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Method to retrieve a blog post by its ID
  getById: function (id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM blogs WHERE id = ?', [id], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  // Method to update a blog post by its ID
  update: async function (id, title, content) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, title, content });
        }
      });
    });
  },

  // Method to delete a blog post by its ID
  delete: async function (id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM blogs WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  }
};

module.exports = Blog;
