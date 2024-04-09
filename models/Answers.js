const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

// Define the Answers schema
const Answer = {
  

  // Method to create a new answer
  create: function (answer, userId, forumId, callback) {
    db.run('INSERT INTO answers (answer, userId, forumId) VALUES (?, ?, ?)', [answer, userId, forumId], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, answer: answer, userId: userId, forumId: forumId });
    });
  },

  // Method to get all answers for a forum post
  getByForumId: function (forumId, callback) {
    db.all('SELECT * FROM answers WHERE forumId = ?', [forumId], function (err, rows) {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  },
  
  // Add other methods as needed
};

module.exports = Answer;
