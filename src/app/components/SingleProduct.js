import React, { Component, useEffect, useState } from 'react'
import { useLocation, Link, Navigate, useParams, useSearchParams } from 'react-router-dom'

const defaultProp = {
    nameCard: "undefined",
    type: "undefined",
    fav: "undefined",
    urlImage: "undefined",
    modal: [
        {
            name: "undefined",
            url: "",
            carac: [
                "Cargando"
            ],
            desc: [
                "Cargando"
            ]
        }
    ]
}

import ChargeScreen from "./ChargeScreen"
import Notifications from "./Notifications"

export default function singleProduct(props) {

    const [product, setProduct] = useState(defaultProp);
    const [currentProduct, setCurrentProduct] = useState(defaultProp.modal[0]);
    const [get, setGet] = useState(false);
    const [connectionAttemp, setConnectionAttemp] = useState(0)
    const [modal, setModal] = useState(false)
    const [editDataModal, setEditDataModal] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const idParam = useParams()
    const searchParams = useSearchParams()

    const getInfo = async () => {
        let ID = idParam.id
        const response = await props.getInfoSingleProduct(ID)

        if (response) {
            setProduct(response)
            setCurrentProduct(response.modal[0])
        }
    }

    const verifyToken = async () => {
        const response = await props.verifyToken()
        setIsValid(response)
        if (response.ok)
            getInfo()
    }


    useEffect(() => {
        verifyToken()
    }, [])

    const ChangeProduct = (name) => {
        setCurrentProduct(product.modal.filter((element) => element.name == name)[0])
    }

    const openModal = (info, param, title) => {
        setModal({
            info: info,
            param: param,
            title: title
        })
        setEditDataModal(info[param])
        document.body.style.overflow = 'hidden'

    }

    const closeModal = (e) => {
        if (e == undefined || e.target == e.currentTarget) {
            setModal(false)
            setEditDataModal(false)
            document.body.style.overflow = ""
        }
    }

    const editProduct = async () => {
        let editProduct = product

        const index = editProduct.modal.findIndex((element) => element.name == currentProduct.name)

        editProduct.modal[index][modal.param] = editDataModal

        closeModal()

        let buttonsHtml = document.getElementsByClassName("btn")

        let buttons = Array.from(buttonsHtml)

        buttons.forEach((button) => {
            button.disabled = true
        })

        const response = await props.editProduct(editProduct)

        if (response) {
            buttons.forEach((button) => {
                button.disabled = false
            })
        }
    }

    const changeArrayEditProduct = (value, index, del) => {
        let array = [...editDataModal]
        if (del)
            array.splice(index, 1)
        else
            array.splice(index, 1, value)
        setEditDataModal(array)
    }

    const changeFocusInput = (e) => {
        if (e.keyCode == 13) {
            const target = e.target.parentNode.parentNode.nextSibling.firstChild.firstChild // Esto guarda el siguiente input
            if (target.tagName == 'INPUT' && !target.readOnly)
                target.focus()
        }
    }

    return (
        <>
            <main className="container d-flex justify-content-center flex-fill flex-column flex-md-row pb-5 border-dark border d-grid border-2">
                {isValid && isValid.ok &&
                    <>
                        {(product.nameCard != "undefined") ?
                            <>
                                <div className="col-12 col-md-5 d-grid align-items-stretch">
                                    <div className="position-sticky top-0 pt-3">
                                        <img className="card-img-top" src={currentProduct.url} />
                                        <div className="col-3 position-absolute top-0 pt-3">
                                            {product.modal.filter(element => element.name != currentProduct.name).map((element) => {
                                                return (
                                                    <img key={element.name + element.url} onClick={() => ChangeProduct(element.name)} className="card-img-top m-1 border border-3 border-dark filter cursor-pointer"
                                                        src={element.url} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-7 px-4 py-3">
                                    <div className="d-flex mb-2 flex-column flex-md-row justify-content-between border-bottom border-2 pb-2">
                                        <h1 className="fs-2 fw-bold col-md-10">{currentProduct.name}</h1>
                                        <div className="pt-md-0 col-12 col-md-1 d-flex align-items-end">
                                            <button onClick={() => openModal(currentProduct, "name", "Change Name")} className="btn btn-warning flex-fill fw-semibold fs-6">Edit</button>
                                        </div>
                                    </div>

                                    <div className="my-4 position-relative d-flex flex-column flex-md-row flex-md-wrap justify-content-md-between">
                                        <h3 className="fw-semibold col-12">Características:</h3>
                                        <ul className="list-group col-12 col-md-10">
                                            {currentProduct.carac.map(element => {
                                                return (
                                                    <li key={element} className="list-group-item">{element}</li>
                                                )
                                            })}
                                        </ul>
                                        <div className="pt-3 pt-md-0 col-12 col-md-1 d-flex align-items-end">
                                            <button onClick={() => openModal(currentProduct, "carac", "Cambiar Caracteristicas")} className="btn btn-warning flex-fill fw-semibold fs-6">Edit</button>
                                        </div>
                                    </div>

                                    <div className="my-4 position-relative d-flex flex-column flex-md-row flex-md-wrap justify-content-md-between">
                                        <h3 className="fw-semibold col-12">Usos:</h3>
                                        <ul className="list-group col-12 col-md-10">
                                            {currentProduct.desc.map(element => {
                                                return (
                                                    <li key={element} className="list-group-item">{element}</li>
                                                )
                                            })}
                                        </ul>
                                        <div className="pt-3 pt-md-0 col-12 col-md-1 d-flex align-items-end">
                                            <button onClick={() => openModal(currentProduct, "desc", "Cambiar Usos")} className="btn btn-warning flex-fill fw-semibold fs-6">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="col-12 col-md-5 d-grid align-items-stretch">
                                    <div className="position-sticky top-0 pt-3">
                                        <img className="card-img-top" src="" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-7 px-4 py-3">
                                    <div className="d-flex mb-2 flex-column flex-md-row justify-content-between border-bottom border-2 pb-2">
                                        <h1 className="fs-2 fw-bold col-md-10 placeholder-glow"><span className="placeholder col-9 rounded" /></h1>
                                    </div>

                                    <div className="my-4 position-relative d-flex flex-column flex-md-row flex-md-wrap justify-content-md-between">
                                        <h3 className="fw-semibold col-12">Características:</h3>
                                        <ul className="list-group col-12 col-md-10">
                                            {[7, 3, 5, 10].map((num, index) => {
                                                return (
                                                    <h5 key={index + "caracteristicas" + num} className="placeholder-glow" >
                                                        <span className={`placeholder col-${num} rounded`} />
                                                    </h5>
                                                )
                                            })}
                                        </ul>
                                    </div>

                                    <div className="my-4 position-relative d-flex flex-column flex-md-row flex-md-wrap justify-content-md-between">
                                        <h3 className="fw-semibold col-12">Usos:</h3>
                                        <ul className="list-group col-12 col-md-10">

                                            {[6, 11, 8, 3].map((num, index) => {
                                                return (
                                                    <h5 key={num + "usos" + index} className="placeholder-glow" >
                                                        <span className={`placeholder col-${num} rounded`} />
                                                    </h5>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }
                {isValid && !isValid.ok && <Navigate to="/login" />}
                {!isValid && <ChargeScreen />}
                <Notifications deleteNotification={props.deleteNotification} notifications={props.notifications} />
            </main >
            {
                modal &&
                <div onClick={(e) => closeModal(e)} className="bg-dark bg-opacity-50 position-fixed top-0 left-0 vw-100 vh-100 d-flex justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6 col-xl-5 h-75 bg-light rounded px-5 py-5 overflow-auto">
                        <h1 className="text-uppercase text-center fw-bold">{modal.title}</h1>

                        <div className="my-4 d-flex flex-column justify-content-center">
                            {typeof (modal.info[modal.param]) == 'string' &&
                                <input type="text" value={editDataModal} onChange={(e) => setEditDataModal(e.target.value)} className="form-control fs-4"
                                    placeholder={"Dato"} />
                            }

                            {Array.isArray(modal.info[modal.param]) &&

                                <>
                                    {editDataModal.map((element, index) => {
                                        return (
                                            <div key={index} className="flex-fill d-flex mt-1">
                                                <div className="col-11">
                                                    <input type="text" onKeyDown={(e) => changeFocusInput(e)} value={element} onChange={(e) => changeArrayEditProduct(e.target.value, index)}
                                                        className="form-control fs-6 no-rounded-end" placeholder={"List " + (index + 1)} />
                                                </div>
                                                <button onClick={() => changeArrayEditProduct(undefined, index, true)} className="btn btn-warning col-1 fs-4 lh-1 no-rounded-start">-</button>
                                            </div>
                                        )
                                    })}
                                    <div className="flex-fill d-flex mt-1">
                                        <div className="col-11">
                                            <input type="text" value={""} readOnly
                                                className="form-control fs-6 no-rounded-end" placeholder={"Add List " + (editDataModal.length + 1)} />
                                        </div>
                                        <button onClick={() => changeArrayEditProduct("", editDataModal.length)} className="btn btn-warning col-1 fs-4 lh-1 no-rounded-start">+</button>
                                    </div>
                                </>
                            }
                        </div>

                        {
                            (JSON.stringify(editDataModal) != JSON.stringify(modal.info[modal.param])) ?
                                <button onClick={() => editProduct()} className="btn btn-warning col-12 fs-4 fw-semibold">Editar</button>
                                :
                                <button onClick={() => editProduct()} className="btn btn-warning col-12 fs-4 fw-semibold" disabled>Editar</button>
                        }
                    </div>
                </div>
            }
        </>
    )
}