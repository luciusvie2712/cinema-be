const express = require('express')
const router = express.Router()

const {
    createPromotion, getPromotions, updatePromotion, deletePromotion, applyPromotion
} = require('../controllers/promotionController')

router.post('/', createPromotion)
router.get('/', getPromotions)
router.put('/:promoId', updatePromotion)
router.delete('/:promoId', deletePromotion)
router.post('/apply', applyPromotion)

module.exports = router