import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Notes(props) {

    const [cards, setCards] = useState([{}])
    const [lastDropdown, setLastDropdown] = useState(undefined)
    const [nameCardModal, setNameCardModal] = useState("")
    const [editNameCardModal, setEditNameCardModal] = useState("")

    const [typeCardModal, setTypeCardModal] = useState("")
    const [editTypeCardModal, setEditTypeCardModal] = useState("")

    const [fileModal, setFileModal] = useState("")
    const [fileModalUrl, setFileModalUrl] = useState("")
    const [idModal, setIdModal] = useState("")
    const [modal, setModal] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const getInfoProducts = async function (signal) {
        const response = await props.getInfoProducts(signal)

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

    const toggleModal = (e) => {
        if (e && e.target != e.currentTarget) {
            return;
        }
        setModal(prev => !prev)
    }

    const openModal = (card) => {
        setNameCardModal(card.nameCard)
        setEditNameCardModal(card.nameCard)

        setTypeCardModal(card.type)
        setEditTypeCardModal(card.type)

        toggleModal()
        openDropdow("dropdownMenu" + card._id)
        setIdModal({
            id: card._id,
            idImg: card.idImg
        })
    }

    const editCardData = async () => {
        let buttonsHtml = document.getElementsByClassName("btn")

        let buttons = Array.from(buttonsHtml)

        buttons.forEach((button) => {
            button.disabled = true
        })

        const response = await props.editHeaderCard(nameCardModal, fileModal, idModal.id, idModal.idImg, typeCardModal)
        toggleModal()

        if (response) {
            buttons.forEach((button) => {
                button.disabled = false
            })
        }

        if (response.ok || response.status === 500) {
            getInfoProducts()
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        getInfoProducts(signal)

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <div className="d-flex justify-content-center flex-wrap">
            {cards[0].nameCard != undefined && cards.map((card, i) => {
                return (
                    <div key={card._id} className="card card-animation mx-1 my-3" style={{ width: "18rem" }}>
                        <Link className="text-decoration-none text-reset" to={"/products/" + card._id}>
                            <img src={card.urlImage} className={"card-img-top" + ((!card.visible) ? " disabled-style" : "")} style={{ minHeight: "20rem" }} alt="..." />
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
                            <li onClick={(e) => {
                                openModal(card)
                            }} className="dropdown-item cursor-pointer user-select-none">Editar Producto</li>
                            <li><hr className="dropdown-divider" /></li>
                            <li onClick={() => deleteProduct(card._id)} className="dropdown-item cursor-pointer user-select-none">Eliminar Producto</li>
                        </ul>
                    </div>
                )
            })}

            {modal &&
                <div onClick={(e) => toggleModal(e)} className="bg-dark bg-opacity-50 position-fixed top-0 left-0 vw-100 vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6 col-xl-5 h-75 bg-light rounded px-5 py-5 overflow-auto">
                        <h1 className="text-uppercase text-center fw-bold">Modificar Producto</h1>

                        <div className="my-4 d-flex flex-column justify-content-center">
                            <input type="text" value={nameCardModal} onChange={(e) => setNameCardModal(e.target.value)} className="form-control"
                                placeholder={"Dato"} />
                        </div>

                        <div className="my-4 d-flex flex-column justify-content-center">
                            <input type="text" value={typeCardModal} onChange={(e) => setNameCardModal(e.target.value)} className="form-control"
                                placeholder={"Dato"} />
                        </div>

                        <div className="my-4 d-flex flex-column justify-content-center">
                            <input type="file" value={fileModalUrl} onChange={(e) => {
                                setFileModal(e.target)
                                setFileModalUrl(e.target.value)
                            }} className="form-control" accept="image/jpeg" />
                        </div>


                        {(typeCardModal.length > 0 && typeCardModal != editTypeCardModal || nameCardModal.length > 0 && nameCardModal != editNameCardModal || (fileModal.files && fileModal.files.length > 0)) ?
                            <button onClick={(e) => editCardData()} className="btn btn-warning col-12 fs-4 fw-semibold">Editar</button>
                            :
                            <button className="btn btn-warning col-12 fs-4 fw-semibold" disabled>Editar</button>}
                    </div>
                </div>}
        </div>
    )
}
