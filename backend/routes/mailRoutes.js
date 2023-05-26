const express = require('express')
const router = express.Router()
const {realMail} = require('../controllers/mailControllers')

router.post('/sendemail', realMail)

module.exports = router