const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData } = require('../controllers/users')
const { protect } = require('../middlewares/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser) 
router.get('/me', protect, getUserData)


module.exports = router