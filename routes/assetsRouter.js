const router = require('express').Router()

const authMiddleware = require('../middleware/authMiddleware')
const assetsController = require('../controllers/assetsController')

router.get('/', authMiddleware, assetsController.getAssets)
router.post('/', authMiddleware, assetsController.addAsset)
router.delete('/', authMiddleware, assetsController.deleteAsset)
router.patch('/', authMiddleware, assetsController.updateAsset)

module.exports = router