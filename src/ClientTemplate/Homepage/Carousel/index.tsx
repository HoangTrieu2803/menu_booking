import React, { ReactElement } from 'react'
import './style.scss'

export default function Carousel(): ReactElement {
    return (
        <div className='carousel'>
            <div className='carousel-content'>
                <h3>Taste the Difference</h3>
                <h1>Fine & Delicious Food</h1>
                <button className="carousel-content__button">
                    LET'S START
                </button>

            </div>
        </div>
    )
}
