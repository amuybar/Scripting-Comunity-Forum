const express = require('express');
const router = express.Router();

// GET route to render the tags  page
router.get('/tag', async (req, res) => {
 
   res.render('pages/tags', );
 
});

module.exports = router;