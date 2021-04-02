const router = require('express').Router()

const usersController = require('../controllers/usersController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, usersController.getUsers)
router.get('/:id', authMiddleware, usersController.getUser)
router.delete('/', authMiddleware, usersController.deleteUser)
router.patch('/', authMiddleware, usersController.updateUser)


module.exports = router