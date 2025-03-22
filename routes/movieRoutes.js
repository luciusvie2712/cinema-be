const express = require('express');
const { getMovies, deleteMovie, addMovie, updateMovie } = require('../controllers/movieController');
const router = express.Router()

router.get('/', getMovies)
router.post('/', addMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)

module.exports = router