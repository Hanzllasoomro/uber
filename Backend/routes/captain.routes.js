const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post("/register",[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('Full name must be at least 3 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'rakshaw']).withMessage('Invalid vehicle type'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Vehicle capacity must be at least 1 character long'),
], captainController.registerCaptain)

router.post("/login",[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
], captainController.loginCaptain)

router.get("/profile", authCaptain, captainController.getProfile) 

router.post("/logout", authCaptain, captainController.logoutCaptain)

module.exports = router;