import React, { Component, useState } from 'react'

export default function Calculadora() {

      const [resul, setResul] = useState([
            "**Ingresa ",
            "La Cantidad De ",
            "**Metros Cuadrados ",
            "Que ",
            "**Deseas Cubrir"
      ])
      const [showModal, setShowModal] = useState(false)
      const [valueM2, setValueM2] = useState("")
      const [select, setSelect] = useState("RM")

      const addNumCalc = (value) => {
            if (value == "0" && valueM2.length == 0)
                  return;

            setValueM2(prev => prev + value)
      }

      const sustractNumCalc = () => {
            setValueM2(prev => prev.substring(0, prev.length - 1))
      }

      const toggleModal = () => {
            document.body.classList.toggle("overflow-hidden")
            setShowModal(prev => !prev)
      }

      const resultadoCalc = () => {
            if (valueM2.length == 0)
                  return;

            switch (select) {
                  case 'CP':

                        var cantidad = parseFloat(valueM2) / 5;
                        if (cantidad < 1) {
                              cantidad = 1;
                        }
                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    " galon de ",
                                    "**Cemento Plastico ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    " galones de ",
                                    "**Cemento Plastico ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }


                        break;

                  case 'RM':
                        var cantidad = parseFloat(valueM2) / 9.3;
                        if (cantidad < 1) {
                              cantidad = 1;
                        }
                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    " rollo de ",
                                    "** Manto",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    " Rollos de ",
                                    "**Manto ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }

                        break;

                  case 'PG':

                        var cantidad = parseFloat(valueM2) / 10;
                        if (cantidad < 1) {
                              cantidad = 1;
                        }
                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    " galon de ",
                                    "** Primer ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    " galones de ",
                                    "** Primer ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }
                        break;

                  case 'TA':

                        var cantidad = parseFloat(valueM2) / 2.7;
                        if (cantidad < 1) {
                              cantidad = 1;
                        }
                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    "** Teja Asfaltica ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    "** Tejas Asfalticas ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }
                        break;

                  case 'PA':

                        var cantidad = parseFloat(valueM2) / 20;
                        if (cantidad < 1) {
                              cantidad = 1;
                        }
                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    " Galon de",
                                    "** Pintura de Aluminio ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    " Galones de ",
                                    "** Pintura de Aluminio ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }

                        break;

                  case 'PE':

                        var cantidad = parseFloat(valueM2) / 37;
                        if (cantidad < 1) {
                              cantidad = 1;
                        }
                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    " Galon de",
                                    "** Pintura Elastomerica ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    " Galones de ",
                                    "** Pintura Elastomerica",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }

                        break;

                  case 'AE':

                        var cantidad = parseFloat(valueM2) / 100;

                        if (cantidad < 1) {
                              cantidad = 1;
                        }

                        if (cantidad == 1) {
                              setResul([
                                    "Se necesita ",
                                    "**" + cantidad,
                                    " Galon de",
                                    "** Asfalto Elastomerico ",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        } else {
                              setResul([
                                    "Se necesitan ",
                                    "**" + cantidad.toFixed(0),
                                    " Galones de ",
                                    "** Asfalto Elastomerico",
                                    "para cubrir ",
                                    "**" + valueM2 + " Metros Cuadrados"
                              ])
                        }
                        break;

            }
            toggleModal();
      }

      const changeSelect = (target) => {
            setSelect(target.target.value);
      }

      return (
            <>
                  <div className="Product-Type">Calculadora</div>
                  <div className="position-relative">

                        <div className="fondo-calc" />
                        <div className="fondo-calc-blanco" />

                        <div className="sec-calculadora">

                              <div className="col-1">
                                    <form className="calc">

                                          <input type="text" id="barra" maxLength="8" value={valueM2} readOnly />

                                          <select name="Producto" onChange={changeSelect} value={select} className="selectCalc">

                                                <option value="RM">Rollos de Manto</option>
                                                <option value="CP">Cemento Plástico (Galon)</option>
                                                <option value="PG">Primer (Galon)</option>
                                                <option value="TA">Tejas Asfálticas</option>
                                                <option value="PA">Pintura de Aluminio (Galon)</option>
                                                <option value="PE">Pintura Elastomérica (Galon)</option>
                                                <option value="AE">Asfalto Elastomerico (Galon)</option>

                                          </select>

                                          <div className="divBoton">

                                                <input type="button" className="botonesCalc" value="1"
                                                      onClick={() => addNumCalc("1")} />

                                                <input type="button" className="botonesCalc" value="2"
                                                      onClick={() => addNumCalc("2")} />

                                                <input type="button" className="botonesCalc" value="3"
                                                      onClick={() => addNumCalc("3")} />

                                                <input type="button" className="botonesCalc" value="4"
                                                      onClick={() => addNumCalc("4")} />

                                                <input type="button" className="botonesCalc" value="5"
                                                      onClick={() => addNumCalc("5")} />

                                                <input type="button" className="botonesCalc" value="6"
                                                      onClick={() => addNumCalc("6")} />

                                                <input type="button" className="botonesCalc" value="7"
                                                      onClick={() => addNumCalc("7")} />

                                                <input type="button" className="botonesCalc" value="8"
                                                      onClick={() => addNumCalc("8")} />

                                                <input type="button" className="botonesCalc" value="9"
                                                      onClick={() => addNumCalc("9")} />

                                                <input type="button" className="botonesCalc" value="&#10229;"
                                                      onClick={() => sustractNumCalc()} />

                                                <input type="button" className="botonesCalc" value="0"
                                                      onClick={() => addNumCalc("0")} />

                                                <input type="button" className="botonesCalc" id="resultado" value="="
                                                      onClick={() => resultadoCalc()} />
                                          </div>
                                    </form>
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

                        {showModal &&
                              <div className="modal-calculadora" onClick={(e) => {
                                    if (e.target == e.currentTarget)
                                          toggleModal()
                              }}>
                                    <div className="container-modal-calculadora">
                                          <div className="container-close-calculadora" onClick={() => toggleModal()}>
                                                <div className="close-bar1-calculadora"></div>
                                                <div className="close-bar2-calculadora"></div>
                                          </div>
                                          <p style={{ textAlign: 'center', fontSize: "24px" }}>
                                                {resul.map((text, index) => {
                                                      return <Texto key={text + index} text={text} />
                                                })}
                                          </p>
                                    </div>
                              </div>}

                  </div>
            </>
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