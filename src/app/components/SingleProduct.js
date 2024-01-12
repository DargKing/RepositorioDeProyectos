import React, { Component, useEffect, useState } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'

const defaultProp = {
        nameCard: "undefined",
        type: "undefined",
        fav: "undefined",
        urlImage: "undefined",
        modal: [
                {
                        name: "undefined",
                        url: "",
                        price: 0,
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
        const [connectionAttemp, setConnectionAttemp] = useState(0)
        const [count, setCount] = useState(1)
        const [intervalID, setIntervalID] = useState(0)
        const [link, setLink] = useState("")
        const params = useParams()

        const createWhatsappLink = (product, cantidad, precio) => {
                const link = `https://wa.me/584249574402?text=Buenos%20dias,%20estoy%20interesad@%20en%0AProducto:%20${product.replace(" ", "%20")}%0ACantidad:%20${cantidad}%0APrecio:%20${precio * cantidad}$`
                setLink(link)
                return;
        }

        const getInfo = (signal) => {
                let path = params.id
                fetch("/products/data/" + path, { signal })
                        .then(response => response.json())
                        .then(response => {
                                setProduct(response);
                                setCurrentProduct(response.modal[0]);
                                createWhatsappLink(response.modal[0].name, 1, response.modal[0].price);
                        })
                        .catch(error => {
                                console.log(error);
                        })
        }

        useEffect(() => {
                const target = document.getElementById("header-nav");
                const top = target.clientHeight - 50
                window.scrollTo(0, top)
                const controller = new AbortController()
                const signal = controller.signal
                getInfo(signal)

                return () => {
                        controller.abort()
                }
        }, [])

        const increaseCount = (value) => {
                if (value < 100) {
                        setCount((prev) => parseInt(prev) + 1)
                        createWhatsappLink(currentProduct.name, value + 1, currentProduct.price)
                }
        }

        const decreaseCount = (value) => {
                if (value > 0) {
                        setCount(prev => prev - 1)
                        createWhatsappLink(currentProduct.name, value - 1, currentProduct.price)
                }
        }

        const changeCount = (value) => {
                if (value > 99) {
                        setCount(99)
                        return;
                }
                if (value < 1) {
                        setCount(1)
                        return;
                }
                createWhatsappLink(currentProduct.name, value, currentProduct.price)
                setCount(value)
        }

        const increaseCountMouseDown = () => {
                let value = count
                const interval = setInterval(() => {
                        value++;
                        increaseCount(value)
                }, 100)
                setIntervalID(interval)
        }

        const decreaseCountMouseDown = () => {
                let value = count
                const interval = setInterval(() => {
                        value--;
                        decreaseCount(value)
                }, 100)
                setIntervalID(interval)
        }


        const ChangeProduct = (name) => {
                setCount(1)
                setCurrentProduct(product.modal.filter((element) => element.name == name)[0])
        }

        return (
                <div>
                        <main className="main-SingleProduct">
                                <div className="container-singleProduct">
                                        <div style={{ display: 'grid' }}>
                                                <div className="container-image-singleProduct img-placeholder-singleProduct">
                                                        <img onLoad={(e) => e.currentTarget.parentElement.classList.remove("img-placeholder-singleProduct")} src={currentProduct.url} />
                                                        <div className="container-mini-image-singleProduct">
                                                                {product && product.modal.filter((element) => element.name != currentProduct.name && element.visible == true).map((element) => {
                                                                        return (
                                                                                <div key={element.name} className="mini-image-singleProduct" onClick={() => ChangeProduct(element.name)}>
                                                                                        <img src={element.url} />
                                                                                </div>
                                                                        )
                                                                })}
                                                        </div>
                                                </div>
                                        </div>
                                        {
                                                currentProduct.name != "undefined" &&
                                                (<div className="container-text-singleProduct">
                                                        <h1 className="text-productName-singleProduct">{currentProduct.name}</h1>



                                                        <div className="container-price-singleProduct">
                                                                <span className="container-controller-price-singleProduct">
                                                                        <div onClick={(e) => decreaseCount(count - 1)} onMouseDown={(e) => decreaseCountMouseDown()} onMouseLeave={() => clearInterval(intervalID)} onMouseUp={() => clearInterval(intervalID)} className="decrease-arrow"></div>
                                                                        <input onChange={(e) => changeCount(e.target.value)} className="counter-input-singleProduct" type="number" value={count} />
                                                                        <div onClick={(e) => increaseCount(count + 1)} onMouseDown={(e) => increaseCountMouseDown()} onMouseLeave={() => clearInterval(intervalID)} onMouseUp={() => clearInterval(intervalID)} className="increase-arrow"></div>
                                                                </span>
                                                                <div className="price-text-container-singleProduct">
                                                                        <h3 className="price-text-singleProduct">{`${currentProduct.price * count}$`}</h3>
                                                                </div>
                                                                <div style={{ display: 'flex', flex: 'auto' }}>
                                                                        <a target="_blank" href={link} className="consulta-singleProduct">Consulta</a>
                                                                </div>
                                                        </div>

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
                                                </div>)
                                        }
                                        {
                                                currentProduct.name == "undefined" &&
                                                (<div className="container-text-singleProduct">
                                                        <h1 className="text-productName-singleProduct">
                                                                <div className="placeholder-loading-6"></div>
                                                        </h1>
                                                        {/* <a className="consulta-singleProduct">Consulta</a> */}

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
                                                </div>)
                                        }


                                </div>
                        </main >
                </div >
        )
}