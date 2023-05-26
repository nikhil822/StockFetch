const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, googleAuth} = require('../controllers/authControllers')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/google', googleAuth)

module.exports = router