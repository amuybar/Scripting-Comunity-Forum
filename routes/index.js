const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/api');
    const questions = response.data;

    // Fetch user information for each question (assuming userid exists)
    const userPromises = questions.map(async (question) => {
      const userId = question.userId; // Replace with the actual property name
      if (userId) {
        try {
          const userResponse = await axios.get(`http://localhost:3001/auth/users/${userId}`); // Replace with user endpoint
          question.user = userResponse.data; // Assuming user data is in response.data
        } catch (error) {
          console.error(`Error fetching user ${userId}`, error);
        }
      }
      return question;
    });

    const enhancedQuestions = await Promise.all(userPromises);

    if (req.isAuthenticated() && req.user) {
      // User is authenticated
      const fullName = req.user.fullName;
      res.render('index', { forumName: 'Scripting Forum', loggedIn: true, fullName: fullName, questions: enhancedQuestions });
    } else {
      // User is not authenticated
      res.render('index', { forumName: 'Scripting Forum', loggedIn: false, questions: enhancedQuestions });
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
