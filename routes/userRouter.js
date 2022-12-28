const { getNotification, getUserData, updateProfile, createNewStudent, createNewStudentCSV } = require('../controllers/userController')

const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const { isAdmin } = require('../middleware/Tokencheck')
const { diskStorage } = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/csv')
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname+ path.extname(file.originalname),
    )
  },
})
var upload = multer({
  storage: storage,
})

router.get("/",getUserData)
router.post("/update-profile",updateProfile)
router.get("/notification",getNotification)

router.use(isAdmin)

router.post("/create-new-student",createNewStudent)
router.post("/create-new-student-csv",upload.single('studentCSV'),createNewStudentCSV)
module.exports = router