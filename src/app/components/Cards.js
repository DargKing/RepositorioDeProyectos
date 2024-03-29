import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Notes(props) {

    const [cards, setCards] = useState([{}])

    const getInfoProducts = async function (signal) {
        fetch("/products/data", { signal })
            .then((obj) => obj.json())
            .then((obj) => {
                setCards(obj)
            })
            .catch((err) => {
                console.error(err)
            })
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

        <div className="caja">

            {props.page == "home" &&
                <>
                    <div className="Product-Type">Productos Destacados</div>
                    {
                        (cards.length > 0 && cards[0].nameCard != undefined) ? cards.filter((item) => item.fav).map((card, i) => {
                            return (
                                <Link key={card.nameCard} to={"/products/" + card._id}>
                                    <div className="card">
                                        <div className="container-card-image">
                                            <img className="myImg" src={card.urlImage} alt={card.nameCard} />
                                        </div>
                                        <div className="backCard">
                                            <h3>{card.nameCard}</h3>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }) :
                            <>
                                <div className="card">
                                    <div className="container-card-image">
                                        <img className="myImg" />
                                    </div>
                                    <div className="backCard loading-backCard">
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="container-card-image">
                                        <img className="myImg" />
                                    </div>
                                    <div className="backCard loading-backCard">
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="container-card-image">
                                        <img className="myImg" />
                                    </div>
                                    <div className="backCard loading-backCard">
                                    </div>
                                </div>
                            </>
                    }
                </>
            }


            {props.page == "productos" &&
                <>
                    <div className="Product-Type">Mantos</div>

                    {(cards.length && cards[0].nameCard != undefined) ? cards.filter((item) => item.type == "manto" && item.modal.filter((element) => element.visible).length > 0).map(card => {
                        return (
                            <Link to={"/products/" + card._id}>
                                <div key={card.nameCard} className="card">
                                    <div className="container-card-image">
                                        <img className="myImg" src={card.urlImage} alt={card.nameCard} />
                                    </div>
                                    <div className="backCard">
                                        <h3>{card.nameCard}</h3>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) :
                        <>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                        </>
                    }


                    <div className="Product-Type">Vaciables</div>

                    {(cards.length && cards[0].nameCard != undefined) ? cards.filter((item) => item.type == "vaciable" && item.modal.filter((element) => element.visible).length > 0 ).map(card => {
                        return (
                            <Link to={"/products/" + card._id}>
                                <div key={card.nameCard} className="card">
                                    <div className="container-card-image">
                                        <img className="myImg" src={card.urlImage} alt={card.nameCard} />
                                    </div>
                                    <div className="backCard">
                                        <h3>{card.nameCard}</h3>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) :
                        <>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                        </>}


                    <div className="Product-Type">Tejas</div>
                    {(cards.length && cards[0].nameCard != undefined) ? cards.filter((item) => item.type == "tejas" && item.modal.filter((element) => element.visible).length > 0).map(card => {
                        return (
                            <Link to={"/products/" + card._id}>
                                <div key={card.nameCard} className="card">
                                    <div className="container-card-image">
                                        <img className="myImg" src={card.urlImage} alt={card.nameCard} />
                                    </div>
                                    <div className="backCard">
                                        <h3>{card.nameCard}</h3>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) :
                        <>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                            <div className="card">
                                <div className="container-card-image">
                                    <img className="myImg" />
                                </div>
                                <div className="backCard loading-backCard">
                                </div>
                            </div>
                        </>
                    }

                </>}

        </div>
    )
}
