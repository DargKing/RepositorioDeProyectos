import React, { Component, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import scrollToComponent from "react-scroll-to-component"

import Nav from './components/Nav'
import Home from './components/Home'
import Faq from './components/Faq'
import Productos from './components/Productos'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Garantia from './components/Garantia'

// Lista de productos

import Post from "./productos.json"

export default function app() {
    const [modal, setModal] = useState({})
    const [seeing, setSeeing] = useState(false)
    const [post, setPost] = useState(Post)
    const [references, setReferences] = useState(null)
    const [redirecting, setRedirecting] = useState(false)
    let navigate = useNavigate();

    const redirectModal = (data) => {
        navigate("/products")
        setModal(data)
        setRedirecting(true)
    }
    
    const moveToCard = () => {
        var ref;
        references.childNodes.forEach(element => {
            if(element.textContent == modal.nameCard)
                ref = element
        });
        let duration = (ref.offsetTop < 100) ? 100: ref.offsetTop / 1.25
        scrollToComponent(ref, { offset: 0, align: 'middle', duration: duration });
        document.body.classList.add('overflow-hidden')
        setTimeout(() => {
            
            document.body.classList.remove('overflow-hidden')
            showModal(modal)
        }, duration + 150)
    }

    const showModal = (data) => {
        document.body.classList.toggle("overflow-hidden")
        if (data) {
            setSeeing(!seeing);
            setModal(data);
            setRedirecting(false)
        } else {
            setSeeing(!seeing);
            setModal({});
            setRedirecting(false)
        }
    }

    const putRef = (ref) => {
        setReferences(ref)
    }

    return (
        <>
            <Nav />
            <Routes>
                <Route path={"/"} element={<Home redirectModal={redirectModal} putRef={putRef} productos={post} />} />
                <Route path={"/products"} element={<Productos redirecting={redirecting}
                    modal={modal} putRef={putRef} seeing={seeing} moveToCard={moveToCard}
                    showModal={showModal} productos={post} references={references}/>} />
                <Route path={"/about"} element={<Contacto />} />
                <Route path={"/faq"} element={<Faq />} />
                <Route path={"/garantia"} element={<Garantia />} />
            </Routes>
            <Footer />
        </>
    )
}