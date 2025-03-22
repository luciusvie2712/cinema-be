const Movie = require('../models/Movie')

const getMovies = async (req, res) => { // Lay danh sach tat ca phim
    try {
        const movies = await Movie.find()
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({message: 'Server Error!'})
    }
}

const updateMovie = async (req, res) => { // Cap nhat thong tin Film
    if (req.user.role !== 'admin') 
        return res.status(403).json({ message: 'You are not authorized to perform this action'})
    try {
        const movieId = req.params.id 
        const updateMovie = await Movie.findByIdAndUpdate(movieId, req.body, {new: true})
        if (!updateMovie) 
            return res.status(404).json({ message: 'Movie not found!'})
        res.status(200).json(updateMovie)
    } catch (error) {
        res.status(500).json({message: "Can't update movie!"})
    }
}

const deleteMovie = async (req, res) => { // Xoa phim
    if (req.user.role !== 'admin') 
        return res.status(403).json({ message: 'You are not authorized to perform this action'})
    try {
        const movieId = req.params.id
        const deleteMovie = await Movie.findOneAndDelete(movieId)
        if (!deleteMovie)
            return res.status(404).json({ message: 'Movie not found!'})
        res.status(200).json(deleteMovie)
    } catch (error) {
        res.status(500).json({message: "Can't delete movie!"})
    }
}

const addMovie = async (req, res) => {
    if (req.user.role !== 'admin') 
        return res.status(403).json({ message: 'You are not authorized to perform this action'})
    try {
        const { title, description, releaseYear, genre, duration, poster, trailer } = req.body
        const newMovie = new Movie({ title, description, releaseYear, genre, duration, poster, trailer })
        await newMovie.save()
        res.status(201).json(newMovie)
    } catch (error) {
        res.status(500).json({message: "Can't add movie!"})
    }
}

module.exports = {getMovies, updateMovie, deleteMovie, addMovie}

