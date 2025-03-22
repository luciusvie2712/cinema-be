const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seats: { type: [String], required: true},
    total: { type: Number, required: true },
    status: { type: String, enum: ['reserved', 'paid', 'canceled'], default: 'reserved' }, // reserved: da giu cho
    paymentInfo: { type: Object, default: null},
    createdAt: { type: Date, default: Date.now },
}, {timestamps: true})
    

module.exports = mongoose.model('Booking', BookingSchema)