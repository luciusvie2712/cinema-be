const Booking = require('../models/Booking')
const Showtime = require('../models/Showtime')

// lay danh sach dat ve
const getBookingList = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name').populate('showtime', 'theater showtime')
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//dat ve (giu ghe)
const createBooking = async (req, res) => {
    try {
        const { userId, movieId, showtimeId, seats } = req.body 

        //Kiem tra ghe da duoc dat chua
        const existingBooking = await Booking.findOne({ showtime: showtimeId, seats: { $in: seats}, status: 'paid'})
        if (existingBooking)
            return res.status(400).json({ message: 'Seats are already booked' })

        //dat cho
        const newBooking = new Booking({ 
            user: userId, movie: movieId, showtime: showtimeId, seats: seats
        })
        await newBooking.save()

        // dat cho thanh cong, giu cho trong 10 phut cho thanh toan
        setTimeout(async () => {
            const checkBooking = await Booking.findById(newBooking._id)
            if (checkBooking && checkBooking.status === 'reserved') {
                await Booking.findByIdAndDelete(newBooking._id)
                console.log('Booking deleted')
            }
        }, 10 * 60 * 1000)

        res.status(201).json({ message: 'Seats are reserved, please check out within 10 minutes!'})
    } catch (error) {
        res.status(500).json({ message: 'Error Server', error })
    }
}

const confirmationBooking = async (req, res) => {
    try {
        const { bookingId, paymentInfo } = req.body

        //Kiem tra don dat cho ton tai khong
        const booking = await Booking.findById(bookingId)
        if (!booking)
            return res.status(400).json({ message: 'Booking not found' })

        // Kiem tra trang thai (chi xac nhan thanh toan khi trang thai la 'reserved')
        if (booking.status !== 'reserved')
            return res.status(400).json({ message: 'Booking status is not reserved' })
        // Cap nhat trang thai thanh 'paid' va luu thong tin thanh toan
        booking.status = 'paid'
        booking.paymentInfo = paymentInfo
        await booking.save()

        res.status(200).json({ message: 'Booking confirmed', booking })
    } catch (error) {
        res.status(500).json({ message: 'Error Server', error })
    }
}

// huy ve
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status : "Cancelled"}, { new: true })
        if (!booking)
            return res.status(404).json({ message: 'Booking not found' })
        res.json({ message: 'Booking cancelled successfully', booking })
    } catch (error) {
        res.status(500).json({ message: 'Error Server', error })
    }
}

module.exports = { getBookingList, createBooking, cancelBooking, confirmationBooking }