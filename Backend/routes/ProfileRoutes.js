const express = require('express');
const router = express.Router();
const { authenticateUser, upload, uploadToS3 } = require('../middlewares/index.js');
const {signup, updateProfile, getProfileByUsername, getProfileById, followUser, unfollowUser, searchUsers} = require('../controllers/ProfileController.js')

router.post('/signup', signup);

router.post('/updateProfile', authenticateUser, upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'bgImage', maxCount: 1},
]) , uploadToS3, updateProfile);

router.get('/username/:username', authenticateUser, getProfileByUsername);

router.get('/profileById', authenticateUser, getProfileById);

router.post('/follow', authenticateUser, followUser);

router.delete('/unfollow', authenticateUser, unfollowUser);

router.get('/search', authenticateUser, searchUsers);

module.exports = router;