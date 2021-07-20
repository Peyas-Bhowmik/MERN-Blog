const express = require("express")
const router = express.Router()
const auth = require('../Utils/auth')
const { updateName, updatePassword, updatePasswordValidation } = require('../controllers/profileController')

router.post('/updateName', auth, updateName)
router.post('/changePassword', [auth, updatePasswordValidation], updatePassword)
module.exports = router