const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// dang ky tai khoan
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body

        // kiem tra email da ton tai chua 
        const existingUser = await User.findOne({ email })
        if (existingUser) 
            return res.status(400).json({ msg: 'Email is available' })

        // ma hoa mat khau
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, email, password: hashedPassword, role: role || 'user' }) // khong the tu dang ky thanh admin
        await newUser.save()
        res.json({ message: 'Register is success!'})
    } catch (error) {
        res.status(500).json({ message: 'Error register', error})
    }
}

// dang nhap
const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({ email })
        if (!user) 
            return res.status(400).json({ msg: 'Email is not available!'})
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ msg: 'Password is not correct!'})
        
        // tao JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.json({ message: 'Login is success!', token, user: {id: user._id, username: user.username, email: user.email, role: user.role} })

    } catch (error) {
        res.status(500).json({ message: 'Error login', error})
    }
}

module.exports = { register, login }