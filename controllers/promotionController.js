const Promotion = require('../models/Promotion')

// them khuyen mai moi 
exports.createPromotion = async (req, res) => {
    try {
        const { code, description, discount, minOrder, expiresAt } = req.body 
        // kiem tra xem ma giam gia da ton tai hay chua
        const existingPromotion = await Promotion.findOne({ code})
        if (existingPromotion) 
            return res.status(400).json({ message: 'Promotion code is available'})

        const newPromotion = new Promotion({ code, description, discount, minOrder, expiresAt })
        await newPromotion.save()
        res.status(201).json(newPromotion)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create promotion' })
    }
}

//lay danh sach khuyen mai
exports.getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find()
        res.status(200).json(promotions)
    } catch (error) {
        res.status(500).json({ error: 'Failed to get promotions' })
    }
}

// cap nhat thong tin khuyen mai
exports.updatePromotion = async (req, res) => {
    try {
        const { code, description, discount, minOrder, expiresAt } = req.body
        const updatePromotion = await Promotion.findOneAndUpdate(req.params.promoId, { code, description, discount, minOrder, expiresAt }, { new: true })
        if (!updatePromotion)
            return res.status(404).json({ message: 'Promotion not found' })
        res.status(200).json(updatePromotion)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update promotion' })
    }
}

exports.deletePromotion = async (req, res) => {
    try {
        const deletePromotion = await Promotion.findByIdAndDelete(req.params.promoId)
        if (!deletePromotion)
            return res.status(404).json({ message: 'Promotion not found' })
        res.status(200).json({ message: 'Promotion deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete promotion' })
    }
}

// Kiem tra va ap dung ma giam gia
exports.applyPromotion = async (req, res) => {
    try {
        const { code, orderAmount } = req.body
        const promotion = await Prommotion.findOne({ code })

        if (!promotion)
            return res.status(404).json({ message: 'Promotion not found' })
        if (new Date(promotion.expiresAt) < new Date())
            return res.status(404).json({ message: 'Promotion has expired' })
        if (orderAmount < promotion.minOrder)
            return res.status(404).json({ message: 'Order amount is less than minimum order'})

        res.status(200).json({ discount: promotion.discount, newTotal: orderAmount - promotion.discount })
    } catch (error) {
        res.status(500).json({ error: 'Failed to apply promotion' })
    }
}