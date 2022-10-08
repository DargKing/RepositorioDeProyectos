import React, { Component } from 'react'

export default class Notes extends Component {

    state = {
        cards: this.props.productos
    }

    componentDidMount() {
        setTimeout(() => {
            if(this.props.redirecting){
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
                    this.state.cards.filter((item) => item.fav).map((card, i) => {
                        return (
                            <div key={card.nameCard + i} onClick={() => this.props.redirectModal(card)} className="card">
                                <img className="myImg" src={card.urlImage} alt={card.nameCard}/>
                                <div className="backCard">
                                    <h3>{card.nameCard}</h3>
                                </div>
                            </div>
                        )
                    })}


                {this.props.page == "productos" &&
                    <>
                        <div className="Product-Type">Mantos</div>

                        {this.state.cards.filter((item) => {
                            return item.type == "manto"
                        }).map(card => {
                            return (
                                <div key={card.nameCard} onClick={() => this.props.showModal(card)} className="card">
                                    <img className="myImg" src={card.urlImage} alt={card.nameCard}/>
                                    <div className="backCard">
                                        <h3>{card.nameCard}</h3>
                                    </div>
                                </div>
                            )
                        })}


                        <div className="Product-Type">Vaciables</div>

                        {this.state.cards.filter((item) => {
                            return item.type == "vaciable"
                        }).map(card => {
                            return (
                                <div key={card.nameCard} onClick={() => this.props.showModal(card)} className="card">
                                    <img className="myImg" src={card.urlImage} alt={card.nameCard}/>
                                    <div className="backCard">
                                        <h3>{card.nameCard}</h3>
                                    </div>
                                </div>
                            )
                        })}


                        <div className="Product-Type">Tejas</div>

                        {this.state.cards.filter((item) => {
                            return item.type == "tejas"
                        }).map(card => {
                            return (
                                <div key={card.nameCard} onClick={() => this.props.showModal(card)} className="card">
                                    <img className="myImg" src={card.urlImage} alt={card.nameCard}/>
                                    <div className="backCard">
                                        <h3>{card.nameCard}</h3>
                                    </div>
                                </div>
                            )
                        })}

                    </>}

            </div>
        )
    }
}
