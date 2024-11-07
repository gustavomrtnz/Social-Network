const express = require('express').Router();

// import user and thought routes 
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// use user and thought routes
// middleware to use user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;