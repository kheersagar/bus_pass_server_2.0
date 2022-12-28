const { loginController, adminLoginController } = require('../controllers/authController');

const router = require('express').Router()

router.post("/login",loginController)
router.post("/admin/login",adminLoginController)

module.exports = router