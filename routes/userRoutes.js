const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/login')
    .post(authController.login)

router
    .route('/login/signup')
    .post(authController.signUp)

router
    .route('/:id')
    .get(userController.findUser)
    .delete(authController.protect, authController.restrictTo("admin"), userController.deleteUser)
    .put(authController.protect, userController.updateUser)

module.exports = router