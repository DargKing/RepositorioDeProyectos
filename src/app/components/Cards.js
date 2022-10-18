import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Notes (props) {

    const [cards, setCards] = useState([{}])

    const getInfoProducts = async function () {
        fetch("/products/data")
            .then((obj) => obj.json())
            .then((obj) => setCards(obj))
    }

   useEffect(() => {
        getInfoProducts()
    }, [])

        return (

            <div className="caja">

                {props.page == "home" &&
                    <>
                        <div className="Product-Type">Productos Destacados</div>
                        {
                            (cards[0].nameCard != undefined) ? cards.filter((item) => item.fav).map((card, i) => {
                                return (
                                    <Link to={"/products/" + card.nameCard.replace(/ /gi, "::")}>
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
                    </>
                }


                {props.page == "productos" &&
                    <>
                        <div className="Product-Type">Mantos</div>

                        {(cards[0].nameCard != undefined) ? cards.filter((item) => {
                            return item.type == "manto"
                        }).map(card => {
                            return (
                                <Link to={"/products/" + card.nameCard.replace(/ /gi, "::")}>
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

                        {(cards[0].nameCard != undefined) ? cards.filter((item) => {
                            return item.type == "vaciable"
                        }).map(card => {
                            return (
                                <Link to={"/products/" + card.nameCard.replace(/ /gi, "::")}>
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

                        {(cards[0].nameCard != undefined) ? cards.filter((item) => {
                            return item.type == "tejas"
                        }).map(card => {
                            return (
                                <Link to={"/products/" + card.nameCard.replace(/ /gi, "::")}>
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
