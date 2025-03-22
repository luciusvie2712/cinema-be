const mongoose = require('mongoose')

const ShowtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    theater: { type: String, required: true }, // ten rap
    screen: { type: String, required: true }, // so phong chieu
    showtime: { type: Date, required: true }, // gio chieu
    seats: { type: Array, default: []} // danh sach cho ngoi
}, { timestamps: true})

module.exports = mongoose.model('Showtime', ShowtimeSchema)