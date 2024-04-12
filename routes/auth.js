const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');



router.get('/users', async (req, res) => {
  try {
    const users = await User.getAllUsers(); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Render the login page
router.get('/login', (req, res) => {
  res.render('login', { errorMessage: req.flash('error') });
});

// Handle login POST request
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}), (req, res) => {
  
});

// Render the register page
router.get('/register', (req, res) => {
  res.render('Register', { errorMessage: req.flash('error') });
});

// Handle register POST request
router.post('/register', async (req, res) => {
  const { username, password, fullName, email } = req.body;

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      req.flash('error', 'Username already exists');
      return res.redirect('/auth/register');
    }

    await User.create(username, password, fullName, email);
    res.redirect('/');
  } catch (err) {
    req.flash('error', 'An error occurred');
    res.redirect('/auth/register');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
