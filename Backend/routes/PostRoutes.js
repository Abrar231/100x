const express = require('express');
const router = express.Router();    
const { authenticateUser } = require('../middlewares/index.js');

const {createNewPost, destroyPost, destroyRepost, postById, createNewComment, destroyComment, getComments, like, destroyLike, userPosts, followingFeed, forYouFeed} = require('../controllers/PostController.js');

router.post('/createPost', authenticateUser, createNewPost);

router.delete('/deletePost', authenticateUser, destroyPost);

router.delete('/deleteRepost', authenticateUser, destroyRepost);

router.get('/postById', authenticateUser, postById);

router.post('/createComment', authenticateUser, createNewComment);

router.delete('/deleteComment', authenticateUser, destroyComment);

router.get('/getComments', authenticateUser, getComments);

router.post('/like', authenticateUser, like);

router.delete('/deleteLike', authenticateUser, destroyLike);

router.get('/userPosts', authenticateUser, userPosts);

router.get('/followingFeed', authenticateUser, followingFeed);

router.get('/forYouFeed', authenticateUser, forYouFeed);

module.exports = router;