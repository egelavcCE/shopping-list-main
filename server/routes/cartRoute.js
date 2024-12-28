const express = require('express');
const router = express.Router();
const { shareCart, getSharedCart } = require('../controllers/cartController');

// Sepet paylaşım route'ları
router.post('/share', shareCart);
router.get('/shared/:shareId', getSharedCart);

module.exports = router;
