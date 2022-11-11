import React, { useEffect } from 'react'

import Slider from "./Slider"
import Cards from "./Cards"
import Notes from "./Notes"
import Calculadora from "./Calculadora"

export default function home (){

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

        return (
            <div>
                <main>
                    <Slider />
                    <Notes />
                    <Cards page={"home"} />
                    <Calculadora />
                    
                </main>
            </div>
        )
}