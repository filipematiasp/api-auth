import User from '../models/User.js'
import bcrypt, {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import validations from './validate.js';

async function register(req, res) {
    try {
        validations.registerValidate(req.body)
        const selectedUser = await User.findOne({email: req.body.email})
        if (selectedUser) {
            return res.status(400).send('Email already exists')
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function login(req, res) {
    const selectedUser = await User.findOne({email: req.body.email})
    if (!selectedUser) {
        return res.status(400).send('Email or password incorrect')
    }
    const passwordAndUserMatch = await compare(req.body.password, selectedUser.password)
    if (!passwordAndUserMatch) {
        return res.status(400).send('Email or password incorrect')
    }

    const token = jwt.sign({
        _id: selectedUser._id,
        name: selectedUser.name,
        email: selectedUser.email
    }, process.env.TOKEN_SECRET)

    res.header('authorization-token', token)
    res.send('User Logged!')
}


export default {
    register,
    login
}