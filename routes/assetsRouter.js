const router = require('express').Router()

const assetsController = require('../controllers/assetsController')

router.get('/', assetsController.getAssets)
router.post('/', assetsController.addAsset)
router.delete('/', assetsController.deleteAsset)
router.patch('/', assetsController.updateAsset)

module.exports = router