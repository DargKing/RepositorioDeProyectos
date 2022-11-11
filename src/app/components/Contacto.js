import React, { useEffect, useRef, useState } from 'react'

export default function contacto(props) {

      const dataContact = [
            {
                  tag: "T",
                  phone: ["0424-9163501", "0424-9574402"],
                  address: "AV. GUARAPICHE, CENTRO COMERCIAL ATLANTICO DE UNARE 1 LOCAL N° 9 UD 291 COMPLEJO MICROEMPRESARIAL DE LA CALLE VENTUARI DE UNARE 1 GALPON N° 7, Ciudad Guayana 8050, Bolívar",
                  horary: ["Lunes a Viernes: 7:30-17:30", "Sábado: 8:00-16:30"],
                  googleMapLinkIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d684.6387851359708!2d-62.749254274772426!3d8.283542114678644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dcbf9dbf20f6843%3A0xfccba790112d792d!2sImpermeabilizadora%20EDIL%20Lluvisol!5e0!3m2!1ses-419!2sve!4v1668006917918!5m2!1ses-419!2sve",
                  googleMapLink: "https://g.page/impermeabilizadora-lluvisol-c-a-?share",
                  imageLinkMobile: "./img/gmaps/mapa-mobile-D.jpg",
                  imageLinkDesktop: "./img/gmaps/mapa-D.jpg"
            },
            {
                  tag: "D",
                  phone: ["0424-9163501", "0424-9574402"],
                  address: "UD-291 COMPLEJO MICRO EMPRESARIAL CALLE VENTUARI GALPON N°7 DE UNARE 1 Ciudad Guayana 8050, Bolívar Venezuela",
                  horary: ["Lunes a Viernes: 7:30-17:30", "Sábado: 8:00-16:30"],
                  googleMapLinkIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d684.6387851359708!2d-62.749254274772426!3d8.283542114678644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dcbf9dbf20f6843%3A0xfccba790112d792d!2sImpermeabilizadora%20EDIL%20Lluvisol!5e0!3m2!1ses-419!2sve!4v1668006917918!5m2!1ses-419!2sve",
                  googleMapLink: "https://g.page/impermeabilizadora-lluvisol-c-a-?share",
                  imageLinkMobile: "./img/gmaps/mapa-mobile-T.jpg",
                  imageLinkDesktop: "./img/gmaps/mapa-T.jpg"
            }
      ]

      const refLoadMobile = useRef()
      const refLoadDesktop = useRef()
      const [currentSelect, setCurrentSelect] = useState(dataContact[0])
      const [select, setSelect] = useState("T")

      const load = (target, element) => {
            target.classList.add("display-none")
            element.target.classList.remove("display-none")
      }

      const changeSelect = (value) => {
            setSelect(value)
            setCurrentSelect(dataContact.filter((element => element.tag == value))[0])
      }

      useEffect(() => {
            window.scrollTo(0, 0);
      }, [])

      return (
            <div>
                  <main>
                        <div className="container-select-contact">
                              <select className="select-contact" value={select} onChange={(e) => changeSelect(e.target.value)}>
                                    <option value="T">Tienda Principal</option>
                                    <option value="D">Deposito</option>
                              </select>
                        </div>

                        <div className="container-contact">

                              {/* Este Iframe Muestra La Direccion En Google Maps --> */}
                              <div className="map-responsive">
                                    {/* <!-- Para dispositivos moviles --> */}
                                    <iframe onLoad={(element) => load(refLoadMobile.current, element)} className="mobile display-none"
                                          src={currentSelect.googleMapLinkIframe}
                                          style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>

                                    {/* Para Desktop */}
                                    <iframe onLoad={(element) => load(refLoadDesktop.current, element)} className="desktop display-none"
                                          src={currentSelect.googleMapLinkIframe}
                                          style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>

                                    <a target="_blank" ref={refLoadMobile} className="mobile" href={currentSelect.googleMapLink}>
                                          <img className="loading-map" src={currentSelect.imageLinkMobile} />
                                    </a>

                                    <a target="_blank" ref={refLoadDesktop} className="desktop" href={currentSelect.googleMapLink}>
                                          <img className="loading-map" src={currentSelect.imageLinkDesktop} />
                                    </a>

                              </div>

                              <div className="container-text-white-contact">
                                    <div className="div-info-contact">
                                          <h3>Teléfonos:</h3>
                                          {currentSelect.phone.map((phone, index, array) => {
                                                if (index < array.length - 1) {
                                                      return (
                                                            <span key={index + "PHONEBR"}>
                                                                  {phone}
                                                                  <br />
                                                            </span>)
                                                }

                                                return <span key={index + "PHONE"}>{phone}</span>
                                          })}
                                    </div>
                                    <div className="div-info-contact">
                                          <h3>Dirección:</h3>
                                          <a target="_blank" href={currentSelect.googleMapLink}>
                                                {currentSelect.address}
                                          </a>
                                    </div>
                                    <div className="div-info-contact">
                                          <h3>Horario:</h3>
                                          {currentSelect.horary.map((horary, index, array) => {
                                                if (index < array.length - 1) {
                                                      return (
                                                            <span key={index + "HORARYBR"}>
                                                                  {horary}
                                                                  <br />
                                                            </span>
                                                      )
                                                }

                                                return <span key={index + "HORARY"}>horary</span>
                                          })}
                                    </div>
                              </div>
                        </div>
                  </main>
            </div>
      )
}
