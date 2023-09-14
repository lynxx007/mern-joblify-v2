import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const createJwt = payload => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}