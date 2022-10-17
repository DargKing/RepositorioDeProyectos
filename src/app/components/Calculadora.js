import React, { Component } from 'react'

export default class Calculadora extends Component {

    state = {
        resul: [
            "**Ingresa ", 
            "La Cantidad De ", 
            "**Metros Cuadrados ",
            "Que ",
            "**Deseas Cubrir"
        ],
        value: "",
        select: "CP"
    }

    addNumCalc = (value) => {
        this.setState({ value: this.state.value + value })
    }

    sustractNumCalc = () => {
        this.setState({ value: this.state.value.substring(0, this.state.value.length - 1) })
    }

    resultadoCalc = () => {
        switch (this.state.select) {

            case 'CP':

                var cantidad = this.state.value / 5;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            " galon de ",
                            "**Cemento Plastico ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            " galones de ",
                            "**Cemento Plastico ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }

                break;

            case 'RM':
                var cantidad = this.state.value / 9.3;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            " rollo de ",
                            "** Manto",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            " Rollos de ",
                            "**Manto ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }

                break;

            case 'PG':

                var cantidad = this.state.value / 10;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            " galon de ",
                            "** Primer ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            " galones de ",
                            "** Primer ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }
                break;

            case 'TA':

                var cantidad = this.state.value / 2.7;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            "** Teja Asfaltica ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            "** Tejas Asfalticas ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }
                break;

            case 'PA':

                var cantidad = this.state.value / 20;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            " Galon de",
                            "** Pintura de Aluminio ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            " Galones de ",
                            "** Pintura de Aluminio ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }

                break;

            case 'PE':

                var cantidad = this.state.value / 37;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            " Galon de",
                            "** Pintura Elastomerica ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            " Galones de ",
                            "** Pintura Elastomerica",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }

                break;

            case 'AE':

                var cantidad = this.state.value / 100;

                if (cantidad == 1) {
                    this.setState({
                        resul: [
                            "Se necesita ",
                            "**" + cantidad,
                            " Galon de",
                            "** Asfalto Elastomerico ",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                } else {
                    this.setState({
                        resul: [
                            "Se necesitan ",
                            "**" + cantidad.toFixed(0),
                            " Galones de ",
                            "** Asfalto Elastomerico",
                            "para cubrir ",
                            "**" + this.state.value + " Metros Cuadrados"
                        ]
                    })
                }
                break;

        }
    }

    changeSelect = (target)=>{
        this.setState({ select: target.target.value})
    }

    render() {
        return (
            <>
            <div className="Product-Type">Calculadora</div>
            <div className="position-relative">

                <div className="fondo-calc" />
                <div className="fondo-calc-blanco" />

                <div className="sec-calculadora">

                    <div className="col-1">
                        <form className="calc">

                            <input type="text" id="barra" maxLength="8" value={this.state.value} readOnly />

                            <select name="Producto" onChange={this.changeSelect} value={this.state.select} className="selectCalc">

                                <option value="CP">Cemento Plástico</option>
                                <option value="RM">Rollos de Manto</option>
                                <option value="PG">Primer (Galon)</option>
                                <option value="TA">Tejas Asfálticas</option>
                                <option value="PA">Pintura de Aluminio (Galon)</option>
                                <option value="PE">Pintura Elastomérica (Galon)</option>
                                <option value="AE">Asfalto Elastomerico (Galon)</option>

                            </select>

                            <div className="divBoton">

                                <input type="button" className="botonesCalc" value="1"
                                    onClick={() => this.addNumCalc(1)} />

                                <input type="button" className="botonesCalc" value="2"
                                    onClick={() => this.addNumCalc(2)} />

                                <input type="button" className="botonesCalc" value="3"
                                    onClick={() => this.addNumCalc(3)} />

                                <input type="button" className="botonesCalc" value="4"
                                    onClick={() => this.addNumCalc(4)} />

                                <input type="button" className="botonesCalc" value="5"
                                    onClick={() => this.addNumCalc(5)} />

                                <input type="button" className="botonesCalc" value="6"
                                    onClick={() => this.addNumCalc(6)} />

                                <input type="button" className="botonesCalc" value="7"
                                    onClick={() => this.addNumCalc(7)} />

                                <input type="button" className="botonesCalc" value="8"
                                    onClick={() => this.addNumCalc(8)} />

                                <input type="button" className="botonesCalc" value="9"
                                    onClick={() => this.addNumCalc(9)} />

                                <input type="button" className="botonesCalc" value="&#10229;"
                                    onClick={() => this.sustractNumCalc()} />

                                <input type="button" className="botonesCalc" value="0"
                                    onClick={() => this.addNumCalc(0)} />

                                <input type="button" className="botonesCalc" id="resultado" value="="
                                    onClick={() => this.resultadoCalc()} />
                            </div>
                        </form>
                        <div className="div-resul" id="divResul">
                            <p>
                                {this.state.resul.map((text, i)=>{
                                    return <Texto key={text + i} text={text}/>
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="col-2 text-white">
                        <h2 className="text-center text-uppercase font-size-28 m-1 font-weight-400">¿como funciona?</h2>
                        <div className="form-group">
                            <h3 className="font-size-24 font-weight-600">Paso 1:</h3>
                            <h3 className="font-weight-500">Introduce la cantidad de metros cuadrados que deseas cubrir</h3>
                        </div>
                        <div className="form-group">
                            <h3 className="font-size-24 font-weight-600">Paso 2:</h3>
                            <h3 className="font-weight-500">Elige el producto que deseas colocar</h3>
                        </div>
                        <div className="form-group">
                            <h3 className="font-size-24 font-weight-600">Paso 3:</h3>
                            <h3 className="font-weight-500">Presiona el botón <b>{"="}</b> y obtendrás la cantidad de
                                productos
                                necesarios</h3>
                        </div>
                    </div>

                </div>


            </div>
            </>
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