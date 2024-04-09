const express = require('express');
const router = express.Router();

// GET route to render the teams page
router.get('/teams', async (req, res) => {
 
   res.render('pages/teams', );
 
});

module.exports = router;