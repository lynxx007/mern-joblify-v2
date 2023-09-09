import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

import jobsRouter from './routers/jobRouter.js'
import { connectDb } from './config/connectDb.js'

await connectDb()

const app = express()


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}



app.use('/api/v1/jobs', jobsRouter)






app.use('*', notFound)
app.use(errorHandler)


const port = process.env.PORT || 5100

app.listen(port, () => {
    console.log('server is running...')
})