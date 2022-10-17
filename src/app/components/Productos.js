import React, { Component } from 'react'

import scrollToComponent from "react-scroll-to-component"

import Cards from "./Cards"
import Modal from "./Modal"

export default class productos extends Component {

    state = {
        seeing: false,
        modal: {}
    }

    render() {
        return (
            <div>
                <main>
                    {this.props.seeing &&
                        <Modal data={this.props.modal} showModal={this.props.showModal} state={this.props.modal} />}
                    <Cards references={this.props.references} redirecting={this.props.redirecting} page={"productos"}
                        putRef={this.props.putRef} showModal={this.props.showModal} productos={this.props.productos}
                        moveToCard={this.props.moveToCard} />
                </main>
            </div>
        )
    }
}
