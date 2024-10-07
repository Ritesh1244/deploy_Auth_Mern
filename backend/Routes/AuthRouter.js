const express = require('express');
const router = express.Router();

const {signValidation,loginValidation} = require('../Middlewares/AuthValidation')
const {signup,login} = require('../Controllers/AuthController');




router.post('/signup',signValidation,signup)
router.post('/login',loginValidation,login)


module.exports = router;