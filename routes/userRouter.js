import express from 'express'

const router = express.Router()
import userController from '../controllers/userController.js'

router.post('/register', (req, res) => {
    res.send(userController.registre())
})

export default router