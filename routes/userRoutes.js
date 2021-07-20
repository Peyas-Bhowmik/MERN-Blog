const app = require('express')
const router = app.Router()
const {regester,registervalidations,login,loginvalidations} = require('../controllers/userController.js')

router.post('/regester',registervalidations,regester)
router.post('/login',loginvalidations,login)

module.exports = router