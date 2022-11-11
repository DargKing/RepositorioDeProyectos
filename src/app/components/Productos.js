import React, { useEffect } from 'react'

import Cards from "./Cards"


export default function productos() {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <div>
            <main>
                <Cards page={"productos"} />
            </main>
        </div>
    )
}
