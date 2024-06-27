const express = require('express');
const router = express.Router();  
const { authenticateUser } = require('../middlewares/index.js');
const {changePassword, isEmailAvailable, login, auth, logout} = require('../controllers/AuthController.js');

router.post('/changePassword', changePassword);

router.get('/emailAvailable', isEmailAvailable);

router.post('/login', login);

router.get('/auth', authenticateUser, auth);

router.post('/logout', authenticateUser, logout);

module.exports = router;