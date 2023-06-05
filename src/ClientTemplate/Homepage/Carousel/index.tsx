import React, { ReactElement } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export default function Carousel(): ReactElement {
    return (
        <div className='carousel'>
            <div className='carousel-content'>
                <h3>Taste the Difference</h3>
                <h1>Fine & Delicious Food</h1>
                <Link to='/order' className="carousel-content__button">
                    LET'S START
                </Link>

            </div>
        </div>
    )
}
