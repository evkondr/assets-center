const router = require('express').Router()

const assetsController = require('../controllers/assetsController')

router.get('/', assetsController.getAssets)

module.exports = router