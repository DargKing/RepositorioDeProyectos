import React, { Component, useEffect, useState } from 'react'

import post from '../faq.json'

export default function faq() {

    const [data, setData] = useState(post)
    const [active, setActive] = useState(undefined)

    open = (number) => {
        var lastItem = active != undefined ? document.getElementById("info" + active) : undefined
        var item = document.getElementById("info" + number)
        if (lastItem && lastItem != item) {
            lastItem.classList.toggle("open-animation")
            lastItem.classList.toggle("close-animation")
        }
        item.classList.toggle("open-animation")
        item.classList.toggle("close-animation")
        if (active != number)
            setActive(number)
        else
            setActive(undefined)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main>
            <h3 className="title-faq">Preguntas Frecuentes</h3>
            {data.map((data, i) => {
                return (
                    <div key={i}>
                        <button onClick={() => open(i)}
                            className={active == i ? "button-faq toggle-btn show" : "button-faq toggle-btn hide"}
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