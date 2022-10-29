import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Notes(props) {

    const [cards, setCards] = useState([{}])
    const [lastDropdown, setLastDropdown] = useState(undefined)
    const navigate = useNavigate()
    const location = useLocation()

    const getInfoProducts = async function () {
        const response = await props.getInfoProducts()

        if (response)
            setCards(response)
    }

    const openDropdow = (id) => {
        let target = document.getElementById(id)
        target.classList.toggle("show")

        if (lastDropdown != undefined && lastDropdown != id) {
            target = document.getElementById(lastDropdown)
            target.classList.remove("show")
        }

        setLastDropdown(id)
    }

    const toDisable = async (id) => {
        openDropdow("dropdownMenu" + id)
        const res = await props.toDisable(id)
        if (res) {
            // window.location.reload()
            setLastDropdown(undefined)
            getInfoProducts()
        }
    }

    const deleteProduct = async (id) => {
        openDropdow("dropdownMenu" + id)
        const res = await props.deleteProduct(id)
        if (res) {
            setLastDropdown(undefined)
            getInfoProducts()
        }
    }

    useEffect(() => {
        getInfoProducts()
    }, [])

    return (
        <div className="d-flex justify-content-center flex-wrap">
            {cards[0].nameCard != undefined && cards.map((card, i) => {
                return (
                    <div key={card._id} className="card card-animation mx-1 my-3" style={{ width: "18rem" }}>
                        <Link className="text-decoration-none text-reset" to={"/products/" + card._id}>
                            <img src={card.urlImage} className={"card-img-top" + ((!card.visible) ? " disabled-style" : "")} alt="..." />
                            <div className="card-body d-flex align-items-center justify-content-center border-top border-2">
                                <p className="card-text text-decoration-none fs-4 fw-semibold text-center">{card.nameCard}</p>
                            </div>
                        </Link>
                        <div onClick={() => openDropdow("dropdownMenu" + card._id)} className="button-3-points bg-light bg-gradient rounded border-dark border-2 border bg-opacity-75">
                            <div className="bolitas"></div>
                            <div className="bolitas"></div>
                            <div className="bolitas"></div>
                        </div>
                        <ul id={"dropdownMenu" + card._id} className="dropdown-menu dropdown-card-container">
                            <li onClick={() => toDisable(card._id)} className="dropdown-item cursor-pointer user-select-none">{(card.visible) ? "Desactivar Producto" : "Activar Producto"}</li>
                            <Link className="text-decoration-none text-reset" to={"/products/" + card._id}>
                                <li className="dropdown-item cursor-pointer user-select-none">Editar Producto</li>
                            </Link>
                            <li><hr className="dropdown-divider" /></li>
                            <li onClick={() => deleteProduct(card._id)} className="dropdown-item cursor-pointer user-select-none">Eliminar Producto</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
