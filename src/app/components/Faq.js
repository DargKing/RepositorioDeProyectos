import React, { Component } from 'react'

import post from '../faq.json'

export default class faq extends Component {

    state = {
        data: post,
        active: undefined,
        infoList: []
    }

    open = (number, target) => {

        var lastItem = this.state.active != undefined ? document.getElementById("info" + this.state.active) : undefined
        var item = document.getElementById("info" + number)
        if(lastItem && lastItem != item){
            lastItem.classList.toggle("open-animation")
            lastItem.classList.toggle("close-animation")
        }
        item.classList.toggle("open-animation")
        item.classList.toggle("close-animation")
        if (this.state.active != number)
        this.setState({
            active: number
        })
        else this.setState({
            active: undefined
        })
    }

    render() {
        return (
            <main>
                <h3 className="title-faq">Preguntas Frecuentes</h3>
                {this.state.data.map((data, i) => {
                    return (
                        <div key={i}>
                            <button onClick={(element) => this.open(i, element)}
                                className={this.state.active == i ? "button-faq toggle-btn show" : "button-faq toggle-btn hide"}
                                id="toggle-btn-${i}">
                                {data.name}
                            </button>

                            <div className="info close-animation" id={"info" + i}>
                                <div style={{ padding: "20px 25px" }}>
                                    {data.info.map((text, i) => {
                                        if (typeof text === "string")
                                            return <Texto key={text + i} text={text} i={i} />
                                        else if (typeof text === 'object')
                                            return (
                                                <ul key={text + i}>
                                                    <Lista state={text} />
                                                </ul>)
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        )
    }
}

function Texto(props) {
    if (props.text.substring(0, 2) == "**")
        return <span className="font-weight-600">{props.text.substring(2)}</span>
    else if (props.text == "\n")
        return (
            <span>
                <br />
                <br />
            </span>
        )
    else
        return <span>{props.text}</span>
}

function Lista(props) {
    return (
        props.state.map((data, i) => {
            return (
                <li key={data + i}>
                    {data.map((text, i) => {
                        return <Texto text={text} key={text + i} />
                    })}
                </li>)
        })
    )
}