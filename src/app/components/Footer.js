import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export default class Footer extends Component {

    move = (target) => {

        this.props.movePage(target)

    }

    render() {
        return (
            <footer className="footer light" id="footerLL">

                <div className="div-footer-img">
                    <Link to="/"><img className="logo-footer" src="./img/Logo-Lluvisol-footer.png" alt="" /></Link>

                    <ul className="ul-footer ul-footer-img ul-data-footer">
                        <li className="li-footer li-data-footer">
                            <img src="./img/icons/pin-de-mapa.png" className="icons-footer" alt="" />
                            <a className="footer-a" href="https://g.page/impermeabilizadora-lluvisol-c-a-?share">UD-291 COMPLEJO
                                MICRO EMPRESARIAL CALLE VENTUARI GALPON N°7 DE UNARE 1 Ciudad Guayana
                                8050, Bolívar Venezuela</a>
                        </li>
                        <li className="li-footer li-data-footer">
                            <img src="./img/icons/llamada-telefonica.png" className="icons-footer" alt="" />
                            0424-9163501 <br /> 0416-1852770 <br /> 0424-9574402
                        </li>
                    </ul>

                </div>


                <ul className=" ul-footer">
                    <li className="li-footer li-footer-title">
                        Navegar
                        <ul className="sub-ul">

                            <Link to="/"><li className="li-footer footer-a">Inicio</li></Link>

                            <Link to="/products"><li className="li-footer footer-a">Productos</li></Link>

                            <Link to="/about"><li className="li-footer footer-a">Contacto</li></Link>

                            <Link to="/faq"><li className="li-footer footer-a">Preguntas Frecuentes</li></Link>

                        </ul>
                    </li>
                </ul>

                <ul className="ul-footer footer-redes">
                    <li className="li-footer li-footer-title">
                        Nuestras Redes
                    </li>

                    <li className="li-footer">
                        <a href=""><img className="icon-nuestras-redes" src="./img/icons/icono_facebook.svg" alt="Facebook" /></a>
                        <a href=""><img className="icon-nuestras-redes" src="./img/icons/icono_instagram.svg" alt="Instagram" /></a>
                        <a href=""><img className="icon-nuestras-redes" src="./img/icons/Whatsapp_logo.svg" alt="Whatsapp" /></a>
                        <a href=""><img className="icon-nuestras-redes" src="./img/icons/tiktok.svg" alt="Tiktok" /></a>
                        <a href=""><img className="icon-nuestras-redes" src="./img/icons/pinterest.svg" alt="Pinterest" /></a>
                        <a href=""><img className="icon-nuestras-redes" src="./img/icons/youtube.svg" alt="Youtube" /></a>
                    </li>

                </ul>

                <div className="footer-copyright">
                    <hr />
                    <span>Tu Mejor Aliado A La Hora De Impermeabilizar</span>
                </div>


            </footer >
        )
    }
}
