import React, { Component, createRef } from 'react'

export default class contacto extends Component {

    refLoadMobile = createRef()
    refLoadDesktop = createRef()

    load = (target, element) => {
        target.classList.add("display-none")
        element.target.classList.remove("display-none")
    }

    render() {
        return (
            <div>
                <main>

                    {/* Este Iframe Muestra La Direccion En Google Maps --> */}

                <div className="center">
                    <div className="map-responsive">
                        {/* <!-- Para dispositivos moviles --> */}
                        <iframe onLoad={(element) => this.load(this.refLoadMobile.current, element)} className="mobile display-none"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15792.764047869729!2d-62.748869!3d8.28378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfccba790112d792d!2sImpermeabilizadora%20EDIL%20Lluvisol%2C%20C.A%20Puerto%20Ordaz%2C%20Ciudad%20Guayana%2C%20Bolivar%2CVenezuela(%20Mantos%2C%20Tejas%20y%20Pinturas)!5e0!3m2!1ses-419!2sve!4v1628093014523!5m2!1ses-419!2sve"
                            style={{ border: "0"}} allowFullScreen="" loading="lazy"></iframe>

                        {/* Para Desktop */}
                        <iframe onLoad={(element) => this.load(this.refLoadMobile.current, element)} className="desktop display-none"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31585.528095739457!2d-62.748869!3d8.28378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfccba790112d792d!2sImpermeabilizadora%20EDIL%20Lluvisol%2C%20C.A%20Puerto%20Ordaz%2C%20Ciudad%20Guayana%2C%20Bolivar%2CVenezuela(%20Mantos%2C%20Tejas%20y%20Pinturas)!5e0!3m2!1ses-419!2sve!4v1639869412121!5m2!1ses-419!2sve"
                            style={{ border: "0"}} allowFullScreen="" loading="lazy"></iframe>

                        <a target="_blank" ref={this.refLoadMobile} className="mobile" href="https://maps.google.com/maps?ll=8.28378,-62.748869&z=14&t=m&hl=es-419&gl=VE&mapclient=embed&cid=18215837355035425069">
                            <img className="loading-map" src="./img/gmaps/mapa-mobile.jpg" />
                        </a>

                        <a target="_blank" ref={this.refLoadDesktop} className="desktop" href="https://maps.google.com/maps?ll=8.28378,-62.748869&z=14&t=m&hl=es-419&gl=VE&mapclient=embed&cid=18215837355035425069">
                            <img className="loading-map" src="./img/gmaps/mapa.jpg" />
                        </a>

                    </div>
                </div>


                    <div className="container-contact text-white">
                        <div className="div-info-contact">
                            <h3>Teléfonos:</h3>
                            0424-9163501
                            <br />
                            0424-9574402
                        </div>
                        <div className="div-info-contact">
                            <h3>Dirección:</h3>
                            <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x8dcbf9dbf20f6843:0xfccba790112d792d?source=g.page.share">
                                UD-291 COMPLEJO MICRO EMPRESARIAL
                                CALLE VENTUARI GALPON N°7
                                DE UNARE 1 Ciudad Guayana 8050,
                                Bolívar Venezuela</a>
                        </div>
                        <div className="div-info-contact">
                            <h3>Horario:</h3>
                            Lunes a Viernes: 7:30-17:30
                            Sábado: 8:00-16:30
                        </div>
                    </div>


                </main>
            </div>
        )
    }
}
