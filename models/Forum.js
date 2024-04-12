const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

// Define the Forum schema
const Forum = {
  create: function (title, content, userId, language, callback) {
    db.run('INSERT INTO forums (title, content, userId, language) VALUES (?, ?, ?, ?)', [title, content, userId, language], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, title: title, content: content, userId: userId, language: language });
    });
  },
  
  getAll: function (callback) {
    db.all('SELECT * FROM forums', function (err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  },
  getById: async function (id) {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM forums WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
      return row;
    } catch (error) {
      throw error;
    }
  },
  getByTitle: async function(title) {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM forums WHERE title = ?', [title], (err, row) => {
          if (err) {
            reject(err);
          } else {
            console.log('Row:', row); // Log the row object
            resolve(row);
          }
        });
      });
      return row;
    } catch (error) {
      throw error;
    }
  },
  updateLikes: function (id, likes, callback) {
    db.run('UPDATE forums SET likes = ? WHERE id = ?', [likes, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: id, likes: likes });
    });
  },
  updateViews: function (id, views, callback) {
    db.run('UPDATE forums SET views = ? WHERE id = ?', [views, id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: id, views: views });
    });
  },
  
  // Add other methods as needed
};

module.exports = Forum;
