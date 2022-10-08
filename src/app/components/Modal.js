import React, { Component } from 'react'

export default class Modal extends Component {

    state = {
        multiplicador: 1,
        seeing: 0,
        data: this.props.data
    }

    add = () => {
        if (this.state.multiplicador < 99) this.setState({ multiplicador: this.state.multiplicador + 1 })
    }
    sustract = () => {
        if (this.state.multiplicador > 1) this.setState({ multiplicador: this.state.multiplicador - 1 })
    }

    changeInput = (e) => {
        console.log(e.target.value.length)
        if (!isNaN(parseInt(e.target.value))) {
            if (e.target.value < 1)
                this.setState({ multiplicador: 1 })
            else if (e.target.value > 99)
                this.setState({ multiplicador: 99 })
            else
                this.setState({ multiplicador: parseInt(e.target.value) })

        }
    }

    changeModal = (value) => {
        this.setState({ seeing: value })
    }

    redireccion = () => {

    }

    render() {

        return (
            this.state.data.modal.map((data, i) => {
                return <div key={i} style={{
                    opacity: this.state.seeing == i ? "1" : "0",
                    pointerEvents: this.state.seeing == i ? "auto" : "none"
                }}
                    className="modal">
                    <div className="modal-bg-close" onClick={this.props.showModal} />
                    <span className="modal-close" onClick={this.props.showModal}>&times;</span>
                    <div className="modal-container">
                        <div className="modal-container-image">
                            <img src={data.url} className="modal-image" />
                            <div className="modal-container-mini-image">
                                {this.state.data.modal.map((data, i) => {
                                    if (this.state.seeing != i)
                                        return <img key={data.url} src={data.url} onClick={() => this.changeModal(i)}
                                            className="modal-mini-image" />
                                })}
                            </div>
                        </div>
                        <div className="modal-container-info">
                            <h2 className="modal-product-title">{data.name}</h2>
                            {/* <div className="form-p">
                                                        <div style={{ display: "flex", alignItems: "center", gap: "0 10px" }}>
                                                        <img src="./img/icons/flecha.svg" style={{ transform: "scaleX(-1)" }} onClick={this.sustract} />
                                                        <input className="count" type="number" name="" value={this.state.multiplicador} min="1" onInput={this.changeInput}
                                                        onChange={this.changeInput} max="99" />
                                                        <img src="./img/icons/flecha.svg" onClick={this.add} />
                                                        </div>
                                                        <span className="spanPrecio">s</span>
                                                </div> */}
                            <h3 className="modal-h3">Características:</h3>
                            <ul className="modal-ul">
                                {data.carac.map((text) => {
                                    return <li key={text} className="modal-li">{text}</li>
                                })}
                            </ul>
                            <h3 className="modal-h3">Usos:</h3>
                            <p className="modal-desc">
                                {data.desc.map((text) => {
                                    return (
                                        <span key={text}>
                                            {text}
                                            <br />
                                        </span>)
                                })}
                            </p>
                            <a onClick={this.redireccion} className="modal-consulta">Consulta</a>
                        </div>
                    </div>
                </div>
            }
            ))
    }
}