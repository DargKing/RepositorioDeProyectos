import React, { Component } from 'react'

import Slider from "./Slider"
import Cards from "./Cards"
import Notes from "./Notes"
import Calculadora from "./Calculadora"

export default class home extends Component {
    render() {
        return (
            <div>
                <main>
                    <Slider />
                    <Notes />
                    <Cards page={"home"} putRef={this.props.putRef} redirectModal={this.props.redirectModal} productos={this.props.productos} />
                    <Calculadora />
                </main>
            </div>
        )
    }
}