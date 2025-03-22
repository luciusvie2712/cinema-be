const express = require('express')
const app = express()
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const movieRoutes = require('./routes/movieRoutes')
const showtimeRoutes = require('./routes/showtimeRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const promotionRoutes = require('./routes/promotionRoutes')

connectDB()


app.use(express.json())
app.use(cors())
app.use('/api/movies', movieRoutes)
app.use('/api/showtimes', showtimeRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/promotions', promotionRoutes)

app.get('/', (req, res) => {
    res.send('Cinema API is running ... ')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
