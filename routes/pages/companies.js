const express = require('express');
const router = express.Router();

// GET route to render the Companies  page
router.get('/companies', async (req, res) => {
 
   res.render('pages/companies', );
 
});

module.exports = router;