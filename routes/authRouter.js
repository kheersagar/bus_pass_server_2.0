const { loginController } = require('../controllers/authController');
const { generateAccessToken } = require('../helpers/generateToken');
const User = require('../UserSchema');

const router = require('express').Router()

router.post("/login",loginController)

module.exports = router