const router = require('express').Router()
const { check } = require('express-validator');

const authController = require('../controllers/authController')

router.post('/login',
// check for email 
check('email', 'not an email').isEmail(),
// password must be at least 5 chars long
check('password', 'password min length is 5').isLength({ min: 5 }),authController.login)
router.post('/register',
check('email', 'not an email').isEmail(),
check('password', 'password min length is 5').isLength({ min: 5 }),
authController.register)

module.exports = router