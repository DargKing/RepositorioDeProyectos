import React, { Component, useEffect, useState } from 'react'

export default class Slider extends Component {

        constructor(props) {
                super(props)
                this.state = {
                        leftPosition: 0,
                        width: 0,
                        stop: true,
                        active: false,

                },
                        this.sliderRef = React.createRef()
        }

        animation = () => {
                if (this.state.active != true) {
                        let target = this.sliderRef.current
                        let tamaño = target.childNodes.length
                        this.setState({
                                width: target.clientWidth,
                                limite: 0,
                                waiting: 0
                        })
                        this.setState({
                                velocity: (target.clientWidth / 100) / 1.75
                        })
                        let interval = setInterval(() => {
                                if (this.state.limite < this.state.leftPosition && !this.state.stop) {
                                        this.setState({ leftPosition: this.state.leftPosition - this.state.velocity })
                                } else {
                                        this.setState({
                                                waiting: this.state.waiting += 15,
                                                stop: true
                                        })
                                        if (this.state.leftPosition <= (tamaño - 1) * -this.state.width) {
                                                this.setState({ leftPosition: 0 })
                                                this.setState({ limite: 0 })
                                        }
                                        if (this.state.waiting >= 1500) {
                                                this.setState({ limite: this.state.limite - this.state.width })
                                                this.setState({ stop: false })
                                                this.setState({ waiting: 0 })
                                        }
                                }
                        }, 15)
                }
        }

        changePosition = (target) => {
                this.setState({
                        leftPosition: -this.state.width * target,
                        limite: this.state.width * target,
                        waiting: 0,
                        stop: true
                })
        }

        /*
                700     1400
                350     
        */

        componentDidMount() {
                this.animation()
                window.addEventListener('resize', () => {
                        if (this.sliderRef.current) {
                                var target = this.sliderRef.current
                                this.setState({
                                        width: target.clientWidth,
                                        leftPosition: (target.clientWidth * this.state.leftPosition) / this.state.width,
                                        velocity: (target.clientWidth / 100) / 1.75,
                                        limite: (target.clientWidth * this.state.limite) / this.state.width
                                })
                        }
                })
        }

        render() {
                return (
                        <div className="wrapper" id="wrapper">
                                <div className="slider">
                                        <ul className="slides" style={{ left: this.state.leftPosition + "px" }} ref={this.sliderRef}>
                                                <li className="slide" id="slide1">
                                                        <img src="./img/slider/photo1.jpg" alt="Slider 1" />
                                                </li>
                                                <li className="slide" id="slide2">
                                                        <img src="./img/slider/photo2.jpg" alt="Slider 2" />
                                                </li>
                                                <li className="slide" id="slide3">
                                                        <img src="./img/slider/photo3.jpg" alt="Slider 3" />
                                                </li>
                                                <li className="slide" id="slide4">
                                                        <img src="./img/slider/photo4.jpg" alt="Slider 4" />
                                                </li>
                                                <li className="slide" id="slide5">
                                                        <img src="./img/slider/photo5.jpg" alt="Slider 5" />
                                                </li>
                                                <li className="slide">
                                                        <img src="./img/slider/photo1.jpg" alt="Slider 6" />
                                                </li>
                                        </ul>
                                        <ul className="slider-controler" id="controller">
                                                <li onClick={() => this.changePosition(0)}>&#8226;</li>
                                                <li onClick={() => this.changePosition(1)}>&#8226;</li>
                                                <li onClick={() => this.changePosition(2)}>&#8226;</li>
                                                <li onClick={() => this.changePosition(3)}>&#8226;</li>
                                                <li onClick={() => this.changePosition(4)}>&#8226;</li>
                                        </ul>
                                </div>
                        </div>
                )
        }
}