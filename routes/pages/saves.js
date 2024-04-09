const express = require('express');
const router = express.Router();

// GET route to render the Saves page
router.get('/saves', async (req, res) => {
 
   res.render('pages/saves', );
 
});

module.exports = router;