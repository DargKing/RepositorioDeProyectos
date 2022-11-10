import React, { useState } from 'react'
import { Link } from "react-router-dom"

export default function Notes() {
        const [notes, setNotes] = useState([{
                title: "Garantia De Hasta 10 Años",
                info: "Te Prometemos Una Garantia De 3 a 10 años, Dependiendo Del Tipo De Trabajo",
                ico: "./img/icons/garantia.svg",
                link: "/garantia"
        },
        {
                title: "Productos Certificados",
                info: `Nosotros Trabajamos Con Productos Certificados Marca EDIL`,
                ico: "./img/icons/producto.svg",
                link: "/products"
        },
        {
                title: "Los Mejores Asesores",
                info: "Contamos con mas de 30 años de experiencia en el campo de la impermeabilización",
                ico: "./img/icons/ganador.svg",
                link: "/garantia"
        }])

        return (
                <div className="caja">
                        {notes.map((note, index) => {
                                return (
                                        <Link key={index} to={note.link}>
                                                <div className="notes">
                                                        <div className="note-fila-1">
                                                                <div className="note-icon text-white">
                                                                        <img src={note.ico} alt="" />
                                                                </div>
                                                                <div className="note-title text-white">
                                                                        <h3>{note.title}</h3>
                                                                </div>
                                                                <div className="note-info text-white">
                                                                        {note.info}
                                                                </div>
                                                        </div>
                                                        <div className="note-more-info text-white">
                                                                Mas Informacion
                                                        </div>
                                                </div>
                                        </Link>
                                )
                        })}
                </div>
        )
}
