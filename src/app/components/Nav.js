import React, { Component } from 'react'

import { Link, NavLink } from 'react-router-dom'

export default class Nav extends Component {

        state = {
                seeing: false
        }

        move = () => {
                this.toogle()
        }

        toogle = () => {
                this.setState({ seeing: !this.state.seeing })
                if (window.innerWidth < 700)
                        document.body.classList.toggle("overflow-hidden")
                else if (window.innerWidth > 700 && this.state.seeing && document.body.classList.contains("overflow-hidden"))
                        document.body.classList.remove("overflow-hidden")
        }

        componentDidMount() {
                window.addEventListener("resize", () => {
                        if (window.innerWidth < 700 && this.state.seeing)
                                document.body.classList.add("overflow-hidden")
                        else if (window.innerWidth > 700 && this.state.seeing && document.body.classList.contains("overflow-hidden"))
                                document.body.classList.remove("overflow-hidden")
                })
        }

        render() {
                return (
                        <header className="header-nav" id="header-nav">
                                <nav className="nav">

                                        <Link onClick={() => this.setState({ seeing: false })} to="/"><img src="/img/Logo-Lluvisol.png" alt="Logo De LLuvisol" /></Link>


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
}