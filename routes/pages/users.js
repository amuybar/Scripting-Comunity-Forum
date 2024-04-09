const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// GET route to render the users page
router.get('/users', async (req, res) => {
  try {
    const user = await User.getAllUsers() ; 
    
    res.render('pages/users', { user });
  } catch (err) {
    console.error('Error fetching userss:', err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;