const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const Blog = require('../../models/Blog');
const passport = require('passport');

// GET route to render the blog page
router.get('/blog', async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.getAll(); // Implement this method in your Blog model

    // Render the blog page template and pass the blogs data to it
    res.render('pages/blog', { blogs });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to create a new blog
router.post('/blogs', passport.authenticate('local'), async (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, content } = req.body;
  const userId = req.user.id; // Assuming you're using Passport for authentication

  try {
    // Create the blog
    const newBlog = await Blog.createBlog(title, content, userId); // Implement this method in your Blog model
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Other routes like DELETE, UPDATE, etc. can be added similarly

module.exports = router;
