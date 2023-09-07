import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    return (
        <div>
            <h1>Error page!</h1>
            <Link to='/dashboard'>back home</Link>
        </div>
    )
}

export default Error
