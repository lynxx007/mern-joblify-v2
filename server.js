import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import 'dotenv/config'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

import jobsRouter from './routers/jobRouter.js'
import authRouter from './routers/authRouter.js'
import { connectDb } from './config/connectDb.js'
import { authenticateUser } from './middlewares/authMiddleware.js'

await connectDb()

const app = express()



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())


app.use('/api/v1/jobs', authenticateUser, jobsRouter)
app.use('/api/v1/auth', authRouter)





app.use('*', notFound)
app.use(errorHandler)


const port = process.env.PORT || 5100

app.listen(port, () => {
    console.log('server is running...')
})