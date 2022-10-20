import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
        return (
                <main className="error404-main">
                        <div className="error404-container">
                                <h1 className="error404-title">
                                        Error 404
                                        <img src="/img/icons/error404.png" />
                                </h1>
                                <h3 className="error404-text">
                                        Pagina no encontrada, para regresar al inicio Presione <Link className="error404-link" to="/">"Aquí"</Link>
                                </h3>
                        </div>
                </main>
        )
}
