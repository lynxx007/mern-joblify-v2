export const errorHandler = (err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    const msg = err.message || 'Internal Server Error'

    res.status(500).json({ msg })
}