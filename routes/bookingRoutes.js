const express = require('express')
const router = express.Router()
const { getBookingList, createBooking, cancelBooking, confirmationBooking } = require('../controllers/bookingController')

router.get('/', getBookingList)
router.post('/', createBooking)
router.post('/reserved', confirmationBooking)
router.put('/:id/cancel', cancelBooking)

module.exports = router