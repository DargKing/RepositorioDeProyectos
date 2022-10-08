import React, { Component } from 'react'

import { Link } from 'react-router-dom'

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

        componentDidMount(){
                window.addEventListener("resize", ()=>{
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

                                        <Link onClick={() => this.setState({ seeing: false })} to="/"><img src="./img/Logo-Lluvisol.png" alt="Logo De LLuvisol" /></Link>

                                        <div className="burger" onClick={this.toogle}>
                                                <div className="line-midle"></div>
                                        </div>

                                        <div className="aside-nav" style={{ transform: !this.state.seeing ? "translateX(-100%)" : "translateX(0%)" }} id="asideNav">

                                                <div className="burger active" onClick={this.toogle} >
                                                        <div className="line-midle"></div>
                                                </div>

                                                <ul className="ul-nav">
                                                        <Link onClick={this.move} to="/"><li className="li-nav">Inicio</li></Link>

                                                        <Link onClick={this.move} to="/products"><li className="li-nav">Productos</li></Link>

                                                        <Link onClick={this.move} to="/about"><li className="li-nav">contacto</li></Link>

                                                        <Link onClick={this.move} to="/faq"><li className="li-nav">preguntas frecuentes</li></Link>
                                                </ul>

                                                <div className="redes-sociales">
                                                        <img className="icon-nuestras-redes" src="./img/icons/icono_facebook.svg" alt="facebook" />

                                                        <img className="icon-nuestras-redes" src="./img/icons/icono_instagram.svg" alt="instagram" />

                                                        <img className="icon-nuestras-redes" src="./img/icons/Whatsapp_logo.svg" alt="whatsapp" />

                                                        <img className="icon-nuestras-redes" src="./img/icons/tiktok.svg" alt="tiktok" />

                                                        <img className="icon-nuestras-redes" src="./img/icons/pinterest.svg" alt="pinterest" />

                                                        <img className="icon-nuestras-redes" src="./img/icons/youtube.svg" alt="youtube" />
                                                </div>

                                        </div>

                                </nav>
                                <hr />
                        </header>
                )
        }
}