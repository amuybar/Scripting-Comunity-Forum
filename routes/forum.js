const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const User = require('../models/User');

router.get('/question', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const user = await User.findByUsername(req.user.username);
      res.render('question', { userId: user.id }); 
    } else {
      res.render('login');
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to create a new forum post
router.post('/ask-question', (req, res) => {
  const { title, content, userId, language } = req.body; 
  Forum.create(title, content, userId, language, (err, post) => { 
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    
    res.redirect('/');
  });
});

// Route to get all forum posts
router.get('/', (req, res) => {
  Forum.getAll((err, posts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(posts);
  });
});

// Route to get a specific forum post by its ID
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  Forum.getById(postId, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  });
});

// Route to update likes for a forum post
router.put('/:id/likes', (req, res) => {
  const postId = req.params.id;
  const likes = req.body.likes;
  Forum.updateLikes(postId, likes, (err, updatedPost) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(updatedPost);
  });
});

// Route to update views for a forum post
router.put('/:id/views', (req, res) => {
  const postId = req.params.id;
  const views = req.body.views;
  Forum.updateViews(postId, views, (err, updatedPost) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(updatedPost);
  });
});

module.exports = router;