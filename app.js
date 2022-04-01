import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

const app = express()
import userRouter from './routes/userRouter.js'


app.use('/user', userRouter)


app.listen(process.env.PORT, () => {
    console.log('Server Running!')
})



