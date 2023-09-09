import 'dotenv/config'
import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}