
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answers');

// Create a new answer
router.post('/answers', (req, res) => {
  const { answer, userId, forumId } = req.body;

  // Call the create method from the Answer model to insert a new answer into the database
  Answer.create(answer, userId, forumId, (err, newAnswer) => {
    if (err) {
      console.error('Error creating answer:', err);
      return res.status(500).send('Error creating answer');
    }
    res.status(201).json(newAnswer);
  });
});

// Get all answers for a forum post
router.get('/answers/:forumId', (req, res) => {
  const forumId = req.params.forumId;

  // Call the getByForumId method from the Answer model to retrieve all answers for the specified forum post
  Answer.getByForumId(forumId, (err, answers) => {
    if (err) {
      console.error('Error getting answers:', err);
      return res.status(500).send('Error getting answers');
    }
    res.json(answers);
  });
});

// Add routes for updating and deleting answers as needed

module.exports = router;
