import React, { Component, useEffect, useState } from 'react'

export default class Slider extends Component {

        constructor(props) {
                super(props)
                this.state = {
                        leftPosition: 0,
                        width: 0,
                        stop: true,
                        active: false,
                        sliders: [{
                                img: "./img/slider/photo1.jpg"
                        }, {
                                img: "./img/slider/photo2.jpg"
                        }, {
                                img: "./img/slider/photo3.jpg"
                        }, {
                                img: "./img/slider/photo4.jpg"
                        }, {
                                img: "./img/slider/photo5.jpg"
                        }]
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
                                                {this.state.sliders.map((slider, index, arr) => {
                                                        return (
                                                                <li className="slide" key={index + slider.img} id={"slide" + index}>
                                                                        <img src={slider.img} alt={"Slider " + index} />
                                                                </li>
                                                        )
                                                })}
                                                <li className="slide" key={this.state.sliders.length + this.state.sliders.img} id={"slide" + this.state.sliders.length}>
                                                        <img src={this.state.sliders[0].img} alt={"Slider " + this.state.sliders.length} />
                                                </li>
                                        </ul>
                                        <ul className="slider-controler" id="controller">
                                                {this.state.sliders.map((element, index) => {
                                                        return <li key={index + "points-slider"} onClick={() => this.changePosition(index)}>&#8226;</li>
                                                })}
                                        </ul>
                                </div>
                        </div>
                )
        }
}