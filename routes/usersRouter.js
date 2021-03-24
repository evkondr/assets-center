const router = require('express').Router()

const usersController = require('../controllers/usersController')

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUser)
router.delete('/', usersController.deleteUser)
router.patch('/', usersController.updateUser)


module.exports = router