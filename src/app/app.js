import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import Footer from './components/Footer'
import Error404 from './components/Error404'
import Login from './components/Login'
import Singup from './components/Singup'
import SingleProduct from './components/SingleProduct'

// Lista de productos

export default function app() {
    /**
     * Genera un ID a partir de los milisegundos actuales
     * @returns Number
     */
    const generateID = () => {
        const date = new Date()
        return date.getTime()
    }

    const [session, setSession] = useState(false)
    const [notifications, setNotifications] = useState([])

    const deleteNotification = (notification) => {
        const filter = notifications.filter((not) => {
            return not.id != notification.id
        })
        setNotifications(filter)
    }

    /**
     * Manda un metodo post al servidor
     * @param {String} username 
     * @param {String} password 
     */
    const login = async (username, password) => {
        const response = await fetch("/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })


        const res = await response.json()

        if (res.ok) {
            const data = {
                user: res.user,
                token: res.token
            }
            setSession(data)
            sessionStorage.setItem('credenciales', JSON.stringify(data))
            setNotifications([...notifications, { message: "Login is Successfull", type: "success", id: generateID() }])
            return true;
        } else if (!res.ok) {
            const error = [...notifications]
            for (var i = 0; i < res.error.length; i++) {
                error.push({ message: res.error[i], type: "danger", id: generateID() + i })
            }
            sessionStorage.removeItem("credenciales")
            setNotifications(error)
            return false;
        }

    }

    const getTokenSessionStorage = () => {
        const item = sessionStorage.getItem("credenciales")
        return item
    }

    const deleteTokenSessionStorage = () => {
        const item = sessionStorage.removeItem("credenciales")
        return item
    }

    /**
     * Manda un metodo post al servidor
     * @param {String} username 
     * @param {String} password 
     */
    const singup = async (username, password) => {

        const response = await fetch("/users/singup", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const res = await response.json()

        if (res.ok) {
            setNotifications([...notifications, { message: "Sing Up Successfull", type: "success", id: generateID() }])
            return true;
        } else {
            const error = [...notifications]
            for (var i = 0; i < res.error.length; i++) {
                error.push({ message: res.error[i], type: "danger", id: generateID() + i })
            }
            setNotifications(error)
            return false
        }
    }

    /**
     * Comprueba la valides del token
     */
    const verifyToken = async () => {
        const token = JSON.parse(getTokenSessionStorage())

        if (!token)
            return { ok: false };

        setSession(token)

        const response = await fetch("/users/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(token)
        })

        const data = await response.json()

        if (!data.ok) {
            setNotifications([...notifications, { message: data.error, type: "danger", id: generateID() }])
            deleteTokenSessionStorage()
            return { ok: false }
        } else {
            return { ok: true };
        }
    }

    const toDisable = async (id) => {
        setNotifications([...notifications, { message: "Realizando Tarea", type: "warning", ico: "waiting", id: generateID() }])
        const response = await fetch("/products/data/visibility/" + id, {
            headers: {
                "Content-Type": "application/json"
            },

            body: getTokenSessionStorage(),
            method: "PATCH"
        })
        const data = await response.json()
        if (!data.ok) {
            setNotifications([...notifications, { message: data.error, type: "danger", id: generateID() }])
            const status = response.status
            if (status === 401)
                window.location.reload()
            return false
        } else {
            setNotifications([...notifications, { message: "Producto Modificado", type: "success", id: generateID() }])
            return true;
        }
    }

    const deleteProduct = async (id) => {
        setNotifications([...notifications, { message: "Realizando Tarea", type: "warning", ico: "waiting", id: generateID() }])
        const response = await fetch("/products/data/" + id, {
            headers: {
                "Content-Type": "application/json"
            },

            body: getTokenSessionStorage(),
            method: "DELETE"
        })
        const data = await response.json()
        if (!data.ok) {
            setNotifications([...notifications, { message: data.error, type: "danger", id: generateID() }])
            const status = response.status
            if (status === 401)
                window.location.reload()
            return false
        } else {
            setNotifications([...notifications, { message: "Producto Eliminado", type: "success", id: generateID() }])
            return true;
        }
    }

    useEffect(() => {
        getTokenSessionStorage()
    })

    return (
        <>
            <Nav />
            <Routes>
                <Route path={"/"} element={<Home deleteProduct={deleteProduct} toDisable={toDisable} deleteNotification={deleteNotification} notifications={notifications} verifyToken={verifyToken} />} />
                <Route path={"/products/*"} element={<SingleProduct />}/>
                <Route path={"/login"} element={<Login deleteNotification={deleteNotification} notifications={notifications} login={login} />} />
                <Route path={"/singup"} element={<Singup deleteNotification={deleteNotification} notifications={notifications} singup={singup} />} />
            </Routes>
        </>
    )
}