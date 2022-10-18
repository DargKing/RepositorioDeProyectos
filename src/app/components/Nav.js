import React from 'react'

import { Link, NavLink } from 'react-router-dom'

export default function Nav() {

        return (
                <header className="header-nav" id="header-nav" >
                        <nav className="nav">

                                <Link to="/"><img src="/img/Logo-Lluvisol.png" alt="Logo De LLuvisol" /></Link>


                                <div className="container-links-nav">
                                        <ul className="ul-nav ul-redes-nav">
                                                <a className="redes-sociales-nav" href=""><img src="/img/icons/icono_facebook.svg" alt="Facebook" /></a>
                                                <a className="redes-sociales-nav" href=""><img src="/img/icons/icono_instagram.svg" alt="Instagram" /></a>
                                                <a className="redes-sociales-nav" href=""><img src="/img/icons/Whatsapp_logo.svg" alt="Whatsapp" /></a>
                                                <a className="redes-sociales-nav" href=""><img src="/img/icons/tiktok.svg" alt="Tiktok" /></a>
                                                <a className="redes-sociales-nav" href=""><img src="/img/icons/pinterest.svg" alt="Pinterest" /></a>
                                                <a className="redes-sociales-nav" href=""><img src="/img/icons/youtube.svg" alt="Youtube" /></a>
                                        </ul>
                                        <ul className="ul-nav">
                                                <NavLink style={({ isActive }) => isActive ? { opacity: "1 !important" } : undefined} to="/"><li className="li-nav">Inicio</li></NavLink>

                                                <NavLink style={({ isActive }) => isActive ? { opacity: "1" } : undefined} to="/products"><li className="li-nav">Productos</li></NavLink>

                                                <NavLink style={({ isActive }) => isActive ? { opacity: "1" } : undefined} to="/about"><li className="li-nav">Contacto</li></NavLink>

                                                <NavLink style={({ isActive }) => isActive ? { opacity: "1" } : undefined} to="/faq"><li className="li-nav">Preguntas Frecuentes</li></NavLink>
                                        </ul>
                                </div>

                        </nav>
                        <hr />
                </header>
        )

}