const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', async (req, res) => {
  const response = await axios.get('http://localhost:3001/api');
  const questions = response.data;
  
  if (req.isAuthenticated() && req.user) {
    // User is authenticated
    const fullName = req.user.fullName; 
    res.render('index', { forumName: 'Scripting Forum', loggedIn: true, fullName: fullName , questions: questions});
    
  } else {
    // User is not authenticated
    res.render('index', { forumName: 'Scripting Forum', loggedIn: false ,questions: questions});
  }
});

module.exports = router;
