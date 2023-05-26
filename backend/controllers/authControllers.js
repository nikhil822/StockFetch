const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginValidation = require('../middlewares/loginValidator')
const registerValidation = require('../middlewares/registerValidator')
const dotenv = require('dotenv')
dotenv.config()

const registerUser = async (req, res) => {
    const {error} = registerValidation(req.body)
    if(error){
        return res.json(error.details[0].message)
    }

    const emailExist = await User.find({email: req.body.email})
    if(emailExist.length > 0){
        return res.status(400).json({message: 'Email already exists'})
    }

    const usernameExist = await User.find({username: req.body.username})
    if(usernameExist.length > 0){
        return res.status(400).json({message: 'Username already exists'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        })

        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (err) {
        if(err.keyPattern.email)res.send('Email already exists')
        else if(err.keyPattern.username)res.send('Username already exists')
        res.status(500).json(error)
    }
}

const loginUser = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).json(error.details[0].message)
    }
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({message: 'Email or password is wrong'})
        }

        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass){
            return res.status(400).json({message: 'Email or password is wrong'})
        }

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            username: user.username,
        }, process.env.TOKEN_SECRET)

        return res.cookie('access_token', token, {
            expiry: new Date(Date.now() + 32 * 3600000),
            sameSite: 'none',
            secure: true,
            httpOnly: true
        }) && res.status(200).json({message: 'Logged in successfully'})
    } catch (err) {
        res.status(500).json(err)
    }
}

const logoutUser = async (req, res) => {
    try {
        return res
            .clearCookie('access_token')
            .status(200)
            .json({message: 'Logged out successfully'})
    } catch (err) {
        res.status(500).json(err)
    }
}

const googleAuth = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user) {
            const token = jwt.sign({
                _id: user._id,
            }, process.env.TOKEN_SECRET)

            return res.cookie('access_token', token, {
                expiry: new Date(Date.now() + 32 * 3600000),
                sameSite: 'none',
                secure: true,
                httpOnly: true
            }) && res.status(200).json({message: 'Logged in successfully'})
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({
                _id: savedUser._id,
            }, process.env.TOKEN_SECRET)

            return res.cookie('access_token', token, {
                expiry: new Date(Date.now() + 32 * 3600000),
                sameSite: 'none',
                secure: true,
                httpOnly: true
            }) && res.status(200).json({message: 'Logged in successfully'})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    googleAuth
}