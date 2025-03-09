const blacklistTokenModel = require('../models/blacklistToken.model.js');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service.js');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
        plate: vehicle .plate
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });

}

module.exports.loginCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if(!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await captain.comparePassword(password, captain.password);
    if(!isPasswordMatch) {
        return res.status(400).json({ message: 'Wrong password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ captain, token });

}

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
}