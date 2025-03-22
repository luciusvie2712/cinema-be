const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUsers, updateUser, deleteUser } = require('../controllers/userController')

router.get('/', authMiddleware, getUsers);
router.put('/', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router