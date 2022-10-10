import React, { Component, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


export default function singleProduct() {

        const [product, setProduct] = useState({});
        const [get, setGet] = useState(false)

        const getInfo = async function () {
                let path = useLocation().pathname.split("/")[2]
                fetch("/products/data/" + path)
                        .then(response => response.json())
                        .then(response => setProduct(response))
        }
        
        if(product == {}){
                setGet(true)
                getInfo()
        }

        return (
                <div>
                        <main style={{background: "#fff"}}>
                                {
                                        console.log(product.nameCard)
                                }
                        </main>
                </div>
        )
}