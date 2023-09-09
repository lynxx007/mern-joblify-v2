import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}










const port = process.env.PORT || 5100

app.listen(port, () => {
    console.log('server is running...')
})