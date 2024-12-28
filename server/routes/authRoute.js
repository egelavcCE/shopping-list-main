const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Kullanıcı kayıt rotası
router.post('/register', registerUser);

// Kullanıcı giriş rotası
router.post('/login', loginUser);

module.exports = router;
