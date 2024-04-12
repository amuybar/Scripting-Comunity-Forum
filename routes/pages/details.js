const express = require('express');
const router = express.Router();
const Forum = require('../../models/Forum');
const Answer = require('../../models/Answers');
const User = require('../../models/User');


router.get('/details/:id', async (req, res) => {
  const questionId = req.params.id;
  
  try {
    let myId = null; // Initialize myId variable

    // Check if user is authenticated
    if (req.isAuthenticated() && req.user) {
      myId = req.user.id; // Get the user ID if authenticated
    }

    const question = await Forum.getById(questionId);
    const user = await User.getUserById(question.userId);
    const answers = await Answer.getByForumId(questionId);
    const forumId = question.id;
    const selfId=myId;

    // Fetch user for each answer
    for (const answer of answers) {
      answer.user = await User.getUserById(answer.userId);
      answer.timeElapsed = calculateTimeElapsed(answer.timestamp);
    }

    res.render('pages/detailpage', { question: question, answers: answers, user: user, selfId: selfId,forumId: forumId});
  } catch (error) {
    console.error('Error fetching question details:', error);
    res.status(500).send('Internal Server Error');
  }
});



function calculateTimeElapsed(timestamp) {
  const postTime = new Date(timestamp);
  const currentTime = new Date();
  const elapsedTime = currentTime - postTime;
  const minutes = Math.floor(elapsedTime / 60000);

  if (minutes < 60) {
    return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
  } else {
    
    const hours = Math.floor(minutes / 60);
    return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  }
}

module.exports = router;
