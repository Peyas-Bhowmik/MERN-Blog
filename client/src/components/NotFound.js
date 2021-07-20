import React from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {
    return (
        <div className="notFound">
             <Helmet>
                <title>404 Notfound</title>
                <meta name="description" content="Page not Found" />
            </Helmet>
            <div className="notFound__container">
                <h1 className="notFound__container__h1">404</h1>
                <p className="notFound__container__p">
                    Opps! That page counld not found
                </p>
            </div>
        </div>
    )
}
