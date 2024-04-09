const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

// Define the Forum schema
const Forum = {
  create: function (title, content, userId, callback) {
    db.run('INSERT INTO forums (title, content, userId) VALUES (?, ?, ?)', [title, content, userId], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, title: title, content: content, userId: userId });
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
  getById: function (id, callback) {
    db.get('SELECT * FROM forums WHERE id = ?', [id], function (err, row) {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
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
