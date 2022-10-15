import React, { Component, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

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

export default function singleProduct() {

        const [product, setProduct] = useState(defaultProp);
        const [currentProduct, setCurrentProduct] = useState(defaultProp.modal[0]);
        const [get, setGet] = useState(false);
        const [connectionAttemp, setConnectionAttemp] = useState(0)

        const getInfo = async function () {
                let path = useLocation().pathname.split("/")[2]
                fetch("/products/data/" + path)
                        .then(response => response.json())
                        .then(response => {
                                setProduct(response)
                                setCurrentProduct(response.modal[0])
                        })
                        .catch(error => {
                                if (connectionAttemp < 3)
                                        setGet(false)
                                setConnectionAttemp(connectionAttemp + 1)
                        })
        }

        const ChangeProduct = (name) => {
                setCurrentProduct(product.modal.filter((element) => element.name == name)[0])
        }

        if (get == false) {
                setGet(true)
                getInfo()
        }

        return (
                <div>
                        <main>
                                <div className="container-singleProduct">
                                        <div className="container-image-singleProduct">
                                                <img src={currentProduct.url} />
                                                <div className="container-mini-image-singleProduct">
                                                        {product.modal.filter((element) => element.name != currentProduct.name).map((element) => {
                                                                return (
                                                                        <div key={element.name} className="mini-image-singleProduct" onClick={() => ChangeProduct(element.name)}>
                                                                                <img src={element.url} />
                                                                        </div>
                                                                )
                                                        })}
                                                </div>
                                        </div>
                                        {
                                                currentProduct.name != "undefined" &&
                                                (<div className="container-text-singleProduct">
                                                        <h1 className="text-productName-singleProduct">{currentProduct.name}</h1>

                                                        <ul className="list-ul-singleProduct">
                                                                <h3>Características:</h3>
                                                                {currentProduct.carac.map((element, index) => {
                                                                        return <li key={element + index} className="list-li-singleProduct">{element}</li>
                                                                })}
                                                        </ul>

                                                        <ul className="list-ul-singleProduct">
                                                                <h3>Usos:</h3>
                                                                {currentProduct.desc.map((element, index) => {
                                                                        return <li key={element + index} className="list-li-singleProduct">{element}</li>
                                                                })}
                                                        </ul>
                                                        <a target="_blank" href={"https://api.whatsapp.com/send?phone=" + "04148698221" + "&text=" + "HOLA BABY"} className="consulta-singleProduct">Consulta</a>
                                                </div>)
                                        }
                                        {
                                                currentProduct.name == "undefined" &&
                                                (<div className="container-text-singleProduct">
                                                        <h1 className="text-productName-singleProduct">
                                                                <div className="placeholder-loading-6"></div>
                                                        </h1>

                                                        <ul className="list-ul-singleProduct">
                                                                <h3>Características:</h3>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-1"></div>
                                                                </li>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-3"></div>
                                                                </li>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-2"></div>
                                                                </li>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-4"></div>
                                                                </li>
                                                        </ul>

                                                        <ul className="list-ul-singleProduct">
                                                                <h3>Usos:</h3>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-3"></div>
                                                                </li>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-1"></div>
                                                                </li>
                                                                <li className="list-li-singleProduct">
                                                                        <div className="placeholder-loading-5"></div>
                                                                </li>
                                                        </ul>
                                                        <a className="consulta-singleProduct">Consulta</a>
                                                </div>)
                                        }


                                </div>
                        </main >
                </div >
        )
}