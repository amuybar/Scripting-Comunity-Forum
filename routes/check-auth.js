
const express = require('express');
const router= express.Router();

const isAuthenticated = (req, res, next) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated
    return res.json({ authenticated: true, userId: req.user.id });
  } else {
    // User is not authenticated
    return res.json({ authenticated: false });
  }
};

router.get('/check-auth', isAuthenticated);

module.exports=router;
