const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

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
