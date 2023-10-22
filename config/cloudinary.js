import { v2 as cloudinary } from 'cloudinary'
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})


export const upload = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'Joblify Photo Profile'
        })
        return result
    } catch (error) {
        throw error
    }
}

export const destroy = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id)
    } catch (error) {
        throw error
    }
}