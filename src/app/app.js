import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import Faq from './components/Faq'
import Productos from './components/Productos'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Garantia from './components/Garantia'
import SingleProduct from './components/SingleProduct'
import Error404 from './components/Error404'

// Lista de productos

export default function app() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/products"} element={<Productos />} />
                <Route path={"/products/:id"} element={<SingleProduct />} />
                <Route path={"/about"} element={<Contacto />} />
                <Route path={"/faq"} element={<Faq />} />
                <Route path={"/garantia"} element={<Garantia />} />
                <Route path={"/*"} element={<Error404 />}/>
            </Routes>
            <Footer />
        </>
    )
}