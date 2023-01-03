const { loginController, adminLoginController, forgotPassword, confirmPassword, validatorLoginController } = require('../controllers/authController');

const router = require('express').Router()

router.post("/login",loginController)
router.post("/admin/login",adminLoginController)
router.post("/validator/login",validatorLoginController)
router.get("/forgot-password",forgotPassword)
router.post("/confirm-password",confirmPassword)
module.exports = router