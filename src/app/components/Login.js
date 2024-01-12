import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"

import Notifications from "./Notifications"

export default function login(props) {

        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const navigate = useNavigate()
        const refInput = useRef()

        const callLogin = async (username, password) => {
                const response = await props.login(username, password)
                if (response) {
                        navigate("/")
                        return;
                }
        }

        const moveToInput = (e) => {
                if (e.keyCode === 13) {
                        refInput.current.focus();
                }
        }

        const enterCallLogin = (e) => {
                if(e.keyCode === 13 && username.length > 0 && password.length > 0){
                        callLogin(username, password)
                }
        }

        return (
                <main className="container-sm p-5 flex-fill d-grid px-6">
                        <div className="row justify-content-center align-self-center">
                                <div className="col align-self-center col-12 col-md-8 col-lg-6 col-sm-10 border-dark border border-1 rounded p-3">
                                        <div className="mb-3 text-center">
                                                <h1 className="fs-3 fw-bold">Login</h1>
                                        </div>

                                        <hr className="w-100" />

                                        <div className="mb-3">
                                                <label htmlFor="username-form" className="form-label">Username</label>
                                                <input type="text" value={username} onKeyDown={(e) => moveToInput(e)} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username-form" placeholder="Username" />
                                        </div>

                                        <div className="mb-4">
                                                <label htmlFor="password-form" className="form-label">Password</label>
                                                <input type="text" ref={refInput} onKeyDown={(e) => enterCallLogin(e)} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password-form" placeholder="Password" />
                                        </div>

                                        <div className="d-grid gap-2">
                                                {(username.length > 0 && password.length > 0) ?
                                                        <button onClick={() => callLogin(username, password)} className={"btn btn-success"}>Iniciar Sesion</button>
                                                        :
                                                        <button className={"btn btn-success"} disabled>Iniciar Sesion</button>
                                                }
                                        </div>
                                </div>
                        </div>
                        <Notifications deleteNotification={props.deleteNotification} notifications={props.notifications} />
                </main >
        )
}
