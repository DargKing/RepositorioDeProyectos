import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

import Notifications from './Notifications'

export default function login(props) {

        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const navigate = useNavigate()

        const callSingup = async (username, password) => {
                const res = await props.singup(username, password)
                if(response){
                        navigate("/")
                        return;
                }
        }

        return (
                <main className="container-sm p-5 flex-fill d-grid px-6">
                        <div className="row justify-content-center align-self-center">
                                <div className="col align-self-center col-12 col-md-8 col-lg-6 col-sm-10 border-dark border border-1 rounded p-3">
                                        <div className="mb-3 text-center">
                                                <h1 className="fs-3 fw-bold">Singup</h1>
                                        </div>

                                        <hr className="w-100"/>

                                        <div className="mb-3">
                                                <label htmlFor="username-form" className="form-label">Username</label>
                                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username-form" placeholder="Username" />
                                        </div>

                                        <div className="mb-4">
                                                <label htmlFor="password-form" className="form-label">Password</label>
                                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password-form" placeholder="Password" />
                                        </div>

                                        <div className="d-grid gap-2">
                                                {(username.length > 0 && password.length > 0) ?
                                                        <button onClick={() => callSingup(username, password)} className={"btn btn-success"}>Registrarse</button>
                                                        :
                                                        <button className={"btn btn-success"} disabled>Registrarse</button>
                                                }
                                        </div>
                                </div>
                        </div>

                        <Notifications deleteNotification={props.deleteNotification} notifications={props.notifications}/>
                </main>
        )
}