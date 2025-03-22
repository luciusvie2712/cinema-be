const express = require('express')
const router = express.Router()
const { getShowTimes, addShowTime, updateShowTime, deleteShowTime} = require('../controllers/showtimeController')

router.get('/', getShowTimes);
router.post('/', addShowTime);
router.put('/:id', updateShowTime);
router.delete('/:id', deleteShowTime);

module.exports = router