const Showtime = require('../models/Showtime')

// lay danh sach suat chieu
const getShowTimes = async (req, res) => {
    try {
        // lay thong tin phim,
        const showtimes = await Showtime.find().populate('movie', 'title')
        res.json(showtimes)
    } catch (error) {
        res.status(500).json({ message: "Can't find the movie", error})
    }
}

// them suat chieu moi 
const addShowTime = async (req, res) => {
    try {
        const newShowTime = new Showtime(req.body)
        await newShowTime.save()
        res.status(201).json({ message: "Add new showtime successfully", showtime: newShowtime})
    } catch (error) {
        res.status(500).json({ message: "Can't add new showtime", error})
    }
}

// xoa suat chieu
const deleteShowTime = async (req, res) => {
    try {
        const deleteShowTime = await Showtime.findByIdAndDelete(req.params.id)
        if (!deleteShowTime) 
            return res.status(404).json({ message: "Can't find the showtime" })
        res.json({ message: "Delete showtime successfully" })
    } catch (error) {
        res.status(500).json({ message: "Can't delete showtime", error})
    }
}

//cap nhat suat chieu
const updateShowTime = async (req, res) => {
    try {
        const updateShowTime = await Showtime.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!updateShowTime)
            return res.status(404).json({ message: "Can't find the showtime" })
        res.json({ message: "Update showtime successfully", showtime: updateShowTime})
    } catch (error) {
        res.status(500).json({ message: "Can't update showtime", error})
    }
}

module.exports = { getShowTimes, addShowTime, deleteShowTime, updateShowTime }
