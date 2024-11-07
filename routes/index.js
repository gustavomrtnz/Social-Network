const router = require('express').Router();
const apiRoutes = require('./api');

// use routes
router.use('/api', apiRoutes);
//add an error handling for 404 not found
router.use((req, res)=>{
    return res.status(404).send('Not found');

});

module.exports = router;