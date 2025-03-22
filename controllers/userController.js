const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// lay danh sach user (admin)
const getUsers = async (req, res) => {
    if (req.user.role !== 'admin') 
        return res.status(403).json({ message: 'You are not authorized to perform this action'})
    try {
        if (req.user.role === 'admin') 
            return res.status(403).json({ message: 'You are not authorized to access this resource.' })
        const users = await User.find().select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' }, error)
    }
}


// xoa nguoi dung (admin)
const deleteUser = async (req, res) => {
    if (req.user.role !== 'admin') 
        return res.status(403).json({ message: 'You are not authorized to perform this action'})
    try {
        if (req.user.role === 'admin') 
            return res.status(403).json({ message: ' You are not authorized to access this resource.' })
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'Delete user successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' }, error)
    }
}

// cap nhat thong tin ca nhan
const updateUserProfile = async (req, res) => {
    try {
        const { name } = req.body 
        const updateUser = await User.findByIdAndUpdate(req.user.userId, { name }, { new: true })
        res.json({ message: 'Update user successfully', user: updateUser })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' }, error)
    }
}

// xem thong tin ca nhan
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' }, error)
    }
}
module.exports = { getUsers, updateUserProfile, deleteUser, getUserProfile }