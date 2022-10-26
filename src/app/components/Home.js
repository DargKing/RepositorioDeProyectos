import React, { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom"

import Slider from "./Slider"
import Cards from "./Cards"
import Notes from "./Notes"
import Calculadora from "./Calculadora"
import ChargeScreen from "./ChargeScreen"
import Notifications from './Notifications'

export default function home(props) {

    const [isValid, setIsValid] = useState(false)

    const verifyToken = async () => {
        const response = await props.verifyToken()
        setIsValid(response)
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
            <main className="container flex-fill d-grid px-6">
                {!isValid && <ChargeScreen />}
                {isValid && !isValid.ok && <Navigate to="/login"/>}
                {isValid && isValid.ok && <Cards deleteProduct={props.deleteProduct} toDisable={props.toDisable} />}
                <Notifications deleteNotification={props.deleteNotification} notifications={props.notifications}/>
            </main>
    )
}