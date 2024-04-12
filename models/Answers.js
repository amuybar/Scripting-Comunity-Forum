const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

// Define the Answers schema
const Answer = {
  
  create: async function (answer, userId, forumId) {
    try {
      const result = await db.run('INSERT INTO answers (answer, userId, forumId, timestamp) VALUES (?, ?, ?, datetime("now"))', [answer, userId, forumId]);
      return { id: result.lastID, answer: answer, userId: userId, forumId: forumId, timestamp: new Date().toISOString() };
    } catch (error) {
      throw error;
    }
  },
  getById: async function (id) {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM answers WHERE id = ?', [id], (err, row) => {
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


  getByForumId: async function (forumId) {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM answers WHERE forumId = ?', [forumId], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  // Add other methods as needed
};

module.exports = Answer;
