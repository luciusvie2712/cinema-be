const mongoose = require('mongoose')

const moveSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    poster: { type: String },
    trailer: { type: String },
    rating: { type: Number, default: 0},
    showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }],
})

const Movie = mongoose.model('Movie', moveSchema)

module.exports = Movie