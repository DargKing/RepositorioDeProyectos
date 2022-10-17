import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Notes extends Component {

    state = {
        cards: [{}]
    }

    getInfoProducts = async function () {
        fetch("/products/data")
            .then((obj) => obj.json())
            .then((obj) => this.setState({ cards: obj }))
    }

    componentDidMount() {
        this.getInfoProducts()
        setTimeout(() => {
            if (this.props.redirecting) {
                this.props.moveToCard()
            }
        }, 300)
    }

    render() {
        return (

            <div className="caja" ref={(element) => {
                if (this.props.page != "home")
                    this.props.putRef(element)
            }}>

                {this.props.page == "home" &&
                    <>
                        <div className="Product-Type">Productos Destacados</div>
                        {this.state.cards.filter((item) => item.fav).map((card, i) => {
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
                        })}
                    </>
                }


                {this.props.page == "productos" &&
                    <>
                        <div className="Product-Type">Mantos</div>

                        {this.state.cards.filter((item) => {
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
                        })}


                        <div className="Product-Type">Vaciables</div>

                        {this.state.cards.filter((item) => {
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
                        })}


                        <div className="Product-Type">Tejas</div>

                        {this.state.cards.filter((item) => {
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
                        })}

                    </>}

            </div>
        )
    }
}
