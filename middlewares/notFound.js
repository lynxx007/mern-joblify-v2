export const notFound = (_, res) => {
    res.status(404).send({ msg: 'Not Found' })
}