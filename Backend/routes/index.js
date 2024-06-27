const express = require('express');
const router = express.Router();
const AuthRoutes = require('./AuthRoutes');
const ProfileRoutes = require('./ProfileRoutes');
const PostRoutes = require('./PostRoutes');

// Add routes for all modelRoutes
router.use('/', AuthRoutes); 
router.use('/post', PostRoutes); 
router.use('/profile', ProfileRoutes); 

module.exports = router;