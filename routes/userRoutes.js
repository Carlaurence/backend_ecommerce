const express = require('express')
const router = express.Router();
const userController = require('../controller/userController');
const user = require('../models/user');

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUserById)
router.post('/', userController.createUser)

module.exports = router;