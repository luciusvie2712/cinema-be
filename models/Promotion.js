const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discount: { type: Number, required: true },
    minOrder: { type: Number, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Promotion', promotionSchema)
