const { applyPassController, updatePassController, getPassController, getAdminPassController, getUserData, getValidatorPassController } = require('../controllers/passController')
const { isAdmin } = require('../middleware/Tokencheck')

const router = require('express').Router()

router.post("/apply",applyPassController)
router.get("/get-pass",getPassController)
router.get("/validator/get-pass",getUserData)
router.get("/pass-list",getValidatorPassController)
router.use(isAdmin)
router.get("/applied-list",getAdminPassController)
router.post("/update-pass",updatePassController)

module.exports = router