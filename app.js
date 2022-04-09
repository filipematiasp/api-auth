import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import mongoose from 'mongoose'


mongoose.connect(process.env.MONGO_CONNECTION_URL, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Mongo connected')
    }
})

import cors from 'cors'

const corsOptions = {
    origin: 'http://localhost:8080',
}

app.use(cors())



import userRouter from './routes/userRouter.js'

app.use(express.json())
app.use('/user', userRouter)


app.listen(process.env.PORT, () => {
    console.log('Server running on port: ', process.env.PORT)
})



