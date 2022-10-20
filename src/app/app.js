import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import Footer from './components/Footer'
import Error404 from './components/Error404'

// Lista de productos

export default function app() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path={"/"} element={<Home />} />
            </Routes>
            <Footer />
        </>
    )
}