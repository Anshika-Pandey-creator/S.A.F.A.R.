const express = require('express');
const router = express.Router();
const { registerTourist, login, getMe } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', registerTourist);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);

module.exports = router;
